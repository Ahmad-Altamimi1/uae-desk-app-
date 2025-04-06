import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { apiErrorHandler, ErrorResponse } from "../handlers";
interface IClientConfig {
  baseURL: string;
  apiName: string;
  timeout?: number;
  token: string;
  additionalHeaders?: Record<string, string>;
  retryConfig?: {
    maxRetries: number;
    retryDelay: number;
    retryableStatuses: number[];
  };
}

// Default configurations
const DEFAULT_TIMEOUT = 10000; // 10 seconds
const DEFAULT_RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  retryableStatuses: [408, 429, 500, 502, 503, 504], // Commonly retryable status codes
};

/**
 * Creates and configures an Axios instance with interceptors for authentication and error handling
 * @param config - Configuration options for the Axios client
 * @returns Configured Axios instance
 */
export const createApiClient = async (
  config: IClientConfig
): Promise<AxiosInstance> => {
  // Merge default retry config with provided config
  const retryConfig = {
    ...DEFAULT_RETRY_CONFIG,
    ...config.retryConfig,
  };

  const axiosConfig: AxiosRequestConfig = {
    baseURL: `${config.baseURL}${config.apiName}`,
    timeout: config.timeout || DEFAULT_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
      ...config.additionalHeaders,
      Authorization: config.token ? `Bearer ${config.token}` : "",
    },
  };

  const instance: AxiosInstance = axios.create(axiosConfig);

  /**
   * Request interceptor for logging and modifying requests
   */
  const requestHandler = (
    request: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    // Add request ID for tracking
    request.headers.set("X-Request-ID", generateRequestId());

    // Log outgoing requests in development
    if (process.env.NODE_ENV === "development") {
      console.log(
        `🚀 Request: ${request.method?.toUpperCase()} ${request.url}`,
        {
          headers: request.headers,
          params: request.params,
          data: request.data,
        }
      );
    }

    return request;
  };

  /**
   * Response success interceptor for logging
   */
  const responseHandler = (response: AxiosResponse): AxiosResponse => {
    // Log successful responses in development
    if (process.env.NODE_ENV === "development") {
      console.log(
        `✅ Response: ${response.config.method?.toUpperCase()} ${
          response.config.url
        }`,
        {
          status: response.status,
          data: response.data,
        }
      );
    }

    return response;
  };

  /**
   * Response error interceptor for centralized error handling and retry logic
   */
  const responseErrorHandler = async (
    error: AxiosError<ErrorResponse>
  ): Promise<any> => {
    const statusCode = Number(error.response?.status) || 500;
    const config = error.config as any;

    // Implement retry logic
    if (
      config &&
      retryConfig.retryableStatuses.includes(statusCode) &&
      (!config._retryCount || config._retryCount < retryConfig.maxRetries)
    ) {
      // Increment retry count
      config._retryCount = config._retryCount ? config._retryCount + 1 : 1;

      // Log retry attempt
      console.warn(
        `🔄 Retrying request (${config._retryCount}/${
          retryConfig.maxRetries
        }): ${config.method?.toUpperCase()} ${config.url}`
      );

      // Wait before retrying
      await new Promise((resolve) =>
        setTimeout(resolve, retryConfig.retryDelay * config._retryCount)
      );

      // Retry the request
      return instance.request(config);
    }

    // Log error details in development
    if (process.env.NODE_ENV === "development") {
      console.error("🔴 API Error:", {
        status: statusCode,
        url: config?.url
          ? new URL(config.url, config.baseURL).toString()
          : "Unknown URL",
        method: config?.method,
        message: error.message,
      });
    }

    // Custom error handling
    apiErrorHandler(statusCode, error);
    return Promise.reject(error);
  };

  // Add request interceptor
  instance.interceptors.request.use(requestHandler, (error: AxiosError) =>
    Promise.reject(error)
  );

  // Add response interceptors
  instance.interceptors.response.use(responseHandler, responseErrorHandler);

  return instance;
};

/**
 * Generate a unique request ID for tracing
 */
function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
}

/**
 * Type for cancellable request
 */
export interface CancellableRequest<T> {
  promise: Promise<AxiosResponse<T>>;
  cancel: () => void;
}

/**
 * Creates a cancellable request
 * @param requestFn - Function that returns a promise
 * @returns Object with promise and cancel function
 */
export function createCancellableRequest<T>(
  requestFn: (cancelToken: any) => Promise<AxiosResponse<T>>
): CancellableRequest<T> {
  const source = axios.CancelToken.source();

  const promise = requestFn(source.token);

  return {
    promise,
    cancel: () => source.cancel("Request cancelled by user"),
  };
}

/**
 * API factory to create an API client with routes
 */
export async function createApiWithRoutes(
  config: IClientConfig,
  routeFactories: Record<string, (client: AxiosInstance) => any>
) {
  const client = await createApiClient(config);

  const routes = Object.entries(routeFactories).reduce(
    (acc, [key, factory]) => ({
      ...acc,
      [key]: factory(client),
    }),
    {}
  );

  return { client, routes };
}
