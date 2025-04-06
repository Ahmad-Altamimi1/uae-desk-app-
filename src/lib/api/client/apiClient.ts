"use server";

import { createApiClient } from "./clientConfig";
import { ApiRoute } from ".";
import { createCustomersRoute } from "./routes";
import { BASE_URL } from "@/constants";
import { getCookie } from "@/utils/cookiesHandler";

const token = (await getCookie("token")) || "";
if (!token) throw new Error("Token not found");

export const baseApi = async () => {
  return await createApiClient({
    baseURL: BASE_URL ?? "",
    apiName: "",
    token,
  });
};
export const apiRoutes: ApiRoute = {
  CustomersRoute: createCustomersRoute(await baseApi()),
};
// export const getApiRoutes = async (): Promise<ApiRoute> => {
//   const apiClient = await baseApi();
//   return {
//     CustomersRoute: createCustomersRoute(apiClient),
//   };
// };
