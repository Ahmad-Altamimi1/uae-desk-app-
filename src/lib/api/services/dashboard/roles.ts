import { IResponseUsersRoles, IRequestUsersRoles } from "@/entities/dashboard";
import { api } from "../../serverCore";

export const PermissionService = {
  create: (data: Omit<IRequestUsersRoles, "id">) =>
    api.post<IResponseUsersRoles, Omit<IRequestUsersRoles, "id">>(
      `Roles`,
      data
    ),
  // fetchCUDApi("login", "POST", data),
  //   logout: () => fetchCUDApi<ILogin>(`/users/${id}`, "POST"),
};
