import { AxiosResponse } from "axios";
import { CustomersRoute } from ".";

export type GenericListResponse<T> = {
  data: T;
  // value: {
  //   pageNumber: number;
  //   pageSize: number;
  //   totalRecords: number;
  //   totalPages: number;
  //   data: T;
  // };
  // isSuccess: boolean;
  // isFailure: boolean;
  // error: {
  //   code: string;
  //   message: string;
  // };
};

export type GenericResponse<T> = {
  message: T;
  // value: T;
  // isSuccess: boolean;
  // isFailure: boolean;
  // error: {
  //   code: string;
  //   message: string;
  // };
};

export type ListPayload = {
  pageNumber?: number;
  pageSize?: number;
  orderBy?: OrderBy;
  OrderDirection?: string;
};

export type OrderBy = "asc" | "desc";

export type IAxiosResponse<T, D = any> = Promise<AxiosResponse<T, D>>;

export type PaginateQuery<T> = GenericListResponse<T[]> & {
  next: string | null;
  previous: string | null;
};

export type ApiRoute = {
  CustomersRoute: CustomersRoute;
};
