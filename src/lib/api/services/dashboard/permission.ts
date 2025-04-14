import { IResponseUsersPermissions, IRequestUsersPermissions } from "@/entities/dashboard";
import { api } from "../../serverCore";

export const PermissionService = {
  create: (data: Omit<IRequestUsersPermissions, "id">) =>
    api.post<IResponseUsersPermissions, Omit<IRequestUsersPermissions, "id">>(
      `PermissionStore`,
      data
    ),

    destroy: (id: number) =>
      api.post("PermissionDestroy", { id }), 
  };

  // fetchCUDApi("login", "POST", data),
  //   logout: () => fetchCUDApi<ILogin>(`/users/${id}`, "POST"),

