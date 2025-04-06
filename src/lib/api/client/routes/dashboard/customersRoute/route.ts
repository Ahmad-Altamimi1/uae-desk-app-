import { AxiosInstance } from "axios";
import { CustomersRoute } from "./types";
import endPoints from "@/lib/api/endpoints/dashboard";

export const createCustomersRoute = (
  apiClient: AxiosInstance
): CustomersRoute => {
  return {
    getCustomers: () => apiClient?.get(endPoints.customers.index),
    getCustomer: (slug) => apiClient?.get(`api/resource/Customers/${slug}`),
  };
};
