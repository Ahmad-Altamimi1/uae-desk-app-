import { AxiosInstance } from "axios";
import { CustomersRoute } from "./types";
import endPoints from "@/lib/api/endpoints/dashboard";

export const createCustomersRoute = (
  apiClient: AxiosInstance
): CustomersRoute => {
  return {
    getCustomers: () => apiClient?.get(endPoints.getCustomers),

  };
};
