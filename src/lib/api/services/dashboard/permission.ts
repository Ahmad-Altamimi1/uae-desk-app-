import { IResponseUsersPermissions, IRequestUsersPermissions } from "@/entities/dashboard";
import { api } from "../../serverCore";

export const PermissionService = {
  create: (data: Omit<IRequestUsersPermissions, "id">) =>
    api.post<IResponseUsersPermissions, Omit<IRequestUsersPermissions, "id">>(
      `PermissionStore`,
      data
    ),
  // fetchCUDApi("login", "POST", data),
  //   logout: () => fetchCUDApi<ILogin>(`/users/${id}`, "POST"),
};
