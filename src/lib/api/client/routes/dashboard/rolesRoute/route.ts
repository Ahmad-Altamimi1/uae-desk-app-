import { AxiosInstance } from "axios";
import { RolesRoute } from "./types";
import endPoints from "@/lib/api/endpoints/dashboard";

export const createRolesRoute = (
  apiClient: AxiosInstance
): RolesRoute => {
  return {
    getRoles: () => apiClient?.get(endPoints.getRoles),
    getRole: (slug) => apiClient?.get(`api/resource/Roles/${slug}`),
  };
};
