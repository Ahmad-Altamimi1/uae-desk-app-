import {
  QueryObserverResult,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { type ApiRoute, GenericListResponse } from "./types";
import { apiRoutes } from ".";

interface UseQueryOptionsAxios
  extends Omit<UseQueryOptions<TResult, AxiosError>, "queryKey"> {
  page?: number;
  searchText?: string;
}

interface UseInfiniteQueryOptionsAxios
  extends Omit<
    UseInfiniteQueryOptions<TResult, AxiosError>,
    "queryKey" | "queryFn"
  > {
  page?: number;
  searchText?: string;
}

type ReturnTypeAsync<T extends (...args: any) => any> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : unknown;

const sendRequest = async <
  T extends keyof ApiRoute,
  R extends keyof ApiRoute[T],
  TPayload extends ApiRoute[T][R] extends (data: infer P) => unknown
    ? P
    : never,
  //@ts-ignore
  TResult extends ReturnTypeAsync<ApiRoute[T][R]> = ReturnTypeAsync<
    //@ts-ignore
    ApiRoute[T][R]
  >
>(
  route: T,
  routeMethod: R,
  payload?: TPayload
): Promise<TResult> => {
  const query = apiRoutes[route][routeMethod] as ApiRoute[T][R] extends (
    data: infer P
  ) => unknown
    ? (data: P) => Promise<TResult>
    : never;

  //@ts-ignore
  const response = (await query(payload))?.data;

  return response as TResult;
};

const useQueryWithAxios = <
  T extends keyof ApiRoute,
  R extends keyof ApiRoute[T],
  TPayload extends ApiRoute[T][R] extends (data: infer P) => unknown
    ? P
    : never,
  //@ts-ignore
  TResult extends ReturnTypeAsync<ApiRoute[T][R]> = ReturnTypeAsync<
    //@ts-ignore
    ApiRoute[T][R]
  >
>(
  route: T,
  routeMethod: R,
  payload?: TPayload,
  options?: UseQueryOptionsAxios
): QueryObserverResult<TResult, AxiosError> => {
  return useQuery<TResult, AxiosError>({
    ...options,
    queryKey: [`${route}-${routeMethod}`, { ...payload }],
    queryFn: () =>
      sendRequest<T, R, TPayload, TResult>(route, routeMethod, payload),
  });
};

const useInfiniteQueryWithAxios = <
  T extends keyof ApiRoute,
  R extends keyof ApiRoute[T],
  TPayload,
  TResult
>(
  route: T,
  routeMethod: R,
  payload?: TPayload,
  options?: UseInfiniteQueryOptionsAxios<GenericListResponse<TResult[]>>
) => {
  return useInfiniteQuery<GenericListResponse<TResult[]>, AxiosError>({
    ...options,
    queryKey: [`${route}-${routeMethod}`, payload],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await sendRequest<
        T,
        R,
        TPayload & { pageNumber: number },
        TResult[]
      >(route, routeMethod, {
        ...payload,
        pageNumber: pageParam,
      });
      return response;
    },
  });
};

const useMutationWithAxios = <
  T extends keyof ApiRoute,
  R extends keyof ApiRoute[T],
  TPayload extends ApiRoute[T][R] extends (data: infer P) => unknown
    ? P
    : never,
  TResult extends ReturnTypeAsync<ApiRoute[T][R]> = ReturnTypeAsync<
    ApiRoute[T][R]
  >
>(
  route: T,
  routeMethod: R,
  options?: Omit<
    UseMutationOptions<TResult, AxiosError, TPayload>,
    "mutationKey"
  >
) => {
  return useMutation<TResult, AxiosError, TPayload>({
    mutationKey: [route, routeMethod],
    mutationFn: (payload: TPayload) =>
      sendRequest<T, R, TPayload, TResult>(route, routeMethod, payload),
    ...options,
  });
};

export { useQueryWithAxios, useMutationWithAxios, useInfiniteQueryWithAxios };
