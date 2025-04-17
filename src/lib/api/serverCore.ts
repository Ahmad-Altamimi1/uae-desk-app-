import { getCookie } from "@/utils/cookiesHandler";
import endPoints from "./endpoints/dashboard";
import { toast } from "sonner";
import { log } from "util";

// Type definitions for better type safety
type EndpointKey = keyof typeof endPoints;
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type RequestOptions = RequestInit & {
  skipCsrf?: boolean;
  timeout?: number;
};

// Error class for API-specific errors with additional context
export class ApiError extends Error {
  status: number;
  data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.data = data;
    this.makeToast();
  }
  public makeToast() {
    if (typeof window !== "undefined") {
      toast.error(this.message);
    }
  }
}

// Configuration object for global settings
const apiConfig = {
  csrfTokenExpiration: 60 * 60 * 1000, // 1 hour in milliseconds
  lastCsrfFetch: 0,
  defaultTimeout: 30000, // 30 seconds
};

/**
 * Constructs a valid API URL from base URL and endpoint path
 */
async function getValidApiUrl(endpoint: EndpointKey): Promise<string> {
  let baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  let endpointPath = endPoints[endpoint]?.trim();

  if (!baseUrl) throw new ApiError("API base URL is not defined", 500);
  if (!endpointPath)
    throw new ApiError(`Endpoint "${endpoint}" is not defined`, 500);

  // Normalize baseUrl with correct protocol
  if (!/^https?:\/\//.test(baseUrl)) {
    console.warn(`Invalid baseUrl: ${baseUrl}. Prepending "https://".`);
    baseUrl = `https://${baseUrl}`;
  }

  // Clean up trailing/leading slashes for proper joining
  baseUrl = baseUrl.replace(/\/$/, "");
  endpointPath = endpointPath.replace(/^\//, "");

  return `${baseUrl}/${endpointPath}`;
}

/**
 * Fetches CSRF token with caching to prevent unnecessary requests
 */
async function getCsrfToken(): Promise<void> {
  const now = Date.now();

  // Skip if we fetched the token recently
  if (now - apiConfig.lastCsrfFetch < apiConfig.csrfTokenExpiration) {
    return;
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (!baseUrl) throw new ApiError("API base URL is not defined", 500);

  const csrfUrl = baseUrl.replace(/\/$/, "") + "/sanctum/csrf-cookie";

  try {
    const response = await fetch(csrfUrl, {
      method: "GET",
      credentials: "include", // Ensure cookies are stored
      cache: "default",
    });

    if (!response.ok) {
      throw new ApiError(
        `Failed to fetch CSRF token: ${response.statusText}`,
        response.status
      );
    }

    apiConfig.lastCsrfFetch = now;
  } catch (error) {
    console.error("CSRF token fetch failed:", error);
    throw error instanceof ApiError
      ? error
      : new ApiError(`CSRF token fetch failed: ${error.message}`, 500);
  }
}

/**
 * Creates a timeout promise that rejects after specified milliseconds
 */
function createTimeoutPromise(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(
      () => reject(new ApiError(`Request timed out after ${ms}ms`, 408)),
      ms
    );
  });
}

/**
 * Process API response with proper error handling
 */
async function handleApiResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    // For 204 No Content responses
    if (response.status === 204) {
      return null as T;
    }

    return response.json();
  }

  // Handle error responses
  try {
    const errorData = await response.json();

    throw new ApiError(
      errorData.message || `API error: ${response.statusText} `,
      response.status,
      errorData.errors
    );
  } catch (error) {
    // If error response isn't valid JSON
    if (!(error instanceof ApiError)) {
      throw new ApiError(`API error: ${response.statusText}`, response.status);
    }
    throw error;
  }
}

/**
 * Main fetch function that handles all HTTP methods
 */
async function fetchWithTimeout<TResponse>(
  url: string,
  method: HttpMethod,
  tag: string,
  options: RequestOptions = {},
  body?: any
): Promise<TResponse> {
  const {
    timeout = apiConfig.defaultTimeout,
    skipCsrf = false,
    ...fetchOptions
  } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  const headers = new Headers(fetchOptions.headers);
  const isFormData = body instanceof FormData;

  if (!headers.has("Content-Type") && body && !(body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const token = await getCookie("token");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
console.log("methood",url);
  console.log("body",body);

  const fetchOptionsWithTimeout: RequestInit = {
    ...fetchOptions,
    method,
    credentials: "include",
    headers,
    signal: controller.signal,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    next: {
      tags: [tag],
    },
  };

  try {
    const response = await fetch(url, fetchOptionsWithTimeout);
    clearTimeout(timer);
    return await handleApiResponse<TResponse>(response);
  } catch (error) {
    clearTimeout(timer);

    if (error.name === "AbortError") {
      throw new ApiError(`Request to ${url} timed out after ${timeout}ms`, 408);
    }

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(`Request failed: ${error.message}`, 500);
  }
}

/**
 * General GET request function with retries
 */
export async function fetchApi<TResponse>(
  endpoint: EndpointKey | [EndpointKey, string],
  options: RequestOptions = {},
  retries = 1
): Promise<TResponse> {
  let url: string = "";
  const { skipCsrf = false } = options;
  if (!skipCsrf) {
    await getCsrfToken();
  }
  if (Array.isArray(endpoint)) {
    url = (await getValidApiUrl(endpoint[0])) + endpoint[1];
    endpoint = endpoint[0];
  } else {
    url = await getValidApiUrl(endpoint);
  }
  console.log("GET Request URL:", url);

  try {
    return await fetchWithTimeout<TResponse>(url, "GET", endpoint, options);
  } catch (error) {
    // Implement retry logic for specific errors (network issues, 5xx)
    if (
      retries > 0 &&
      ((error instanceof ApiError && error.status >= 500) ||
        error.message.includes("network") ||
        error.message.includes("timeout"))
    ) {
      console.log(
        `Retrying GET request to ${endpoint}, ${retries} attempts left`
      );
      return fetchApi<TResponse>(endpoint, options, retries - 1);
    }
    throw error;
  }
}

/**
 * Unified function for POST, PUT, DELETE, PATCH requests with CSRF handling
 */
export async function fetchCUDApi<TResponse, TRequest = any>(
  endpoint: EndpointKey,
  method: Exclude<HttpMethod, "GET">,
  body?: TRequest,
  options: RequestOptions = {}
): Promise<TResponse> {
  const { skipCsrf = false } = options;

  if (!skipCsrf) {
    await getCsrfToken();
  }
  await getCsrfToken();

  const url = await getValidApiUrl(endpoint);
  console.log(`${method} Request:`, { url, body: body ? "(data)" : "(empty)" });

  return fetchWithTimeout<TResponse>(url, method, endpoint, options, body);
}

/**
 * Convenience methods for different HTTP verbs
 */
export const api = {
  get: fetchApi,
  post: <TResponse, TRequest = any>(
    endpoint: EndpointKey,
    body?: TRequest,
    options?: RequestOptions
  ) => fetchCUDApi<TResponse, TRequest>(endpoint, "POST", body, options),

  put: <TResponse, TRequest = any>(
    endpoint: EndpointKey,
    body?: TRequest,
    options?: RequestOptions
  ) => fetchCUDApi<TResponse, TRequest>(endpoint, "PUT", body, options),

  delete: <TResponse, TRequest = any>(
    endpoint: EndpointKey,
    body?: TRequest,
    options?: RequestOptions
  ) => fetchCUDApi<TResponse, TRequest>(endpoint, "DELETE", body, options),

  patch: <TResponse, TRequest = any>(
    endpoint: EndpointKey,
    body?: TRequest,
    options?: RequestOptions
  ) => fetchCUDApi<TResponse, TRequest>(endpoint, "PATCH", body, options),
};

/**
 * Abort controller utility to cancel requests
 */
export function createRequestController(timeoutMs?: number) {
  const controller = new AbortController();
  let timeoutId: number | undefined;

  if (timeoutMs) {
    timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
  }

  return {
    signal: controller.signal,
    abort: () => {
      if (timeoutId) clearTimeout(timeoutId);
      controller.abort();
    },
  };
}
