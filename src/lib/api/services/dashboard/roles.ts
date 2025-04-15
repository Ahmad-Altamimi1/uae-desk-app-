import { IResponseUsersRoles, IRequestUsersRoles } from "@/entities/dashboard";
import { api } from "../../serverCore";

export const RolesService = {
  create: (data: Omit<IRequestUsersRoles, "id">) =>
    api.post<IResponseUsersRoles, Omit<IRequestUsersRoles, "id">>(
      `RolesStore`,
      data
    ),
  update: (data: IRequestUsersRoles) =>
    api.post<IResponseUsersRoles, IRequestUsersRoles>(`RolesUpdate`, data),


  destroy: (id: number) =>
    api.post("RolesDestroy", { id }),
  // fetchCUDApi("login", "POST", data),
  //   logout: () => fetchCUDApi<ILogin>(`/users/${id}`, "POST"),
};
