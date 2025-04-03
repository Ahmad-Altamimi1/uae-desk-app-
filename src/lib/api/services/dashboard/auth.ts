import { ILogin } from "@/entities/dashboard";
import { api } from "../../serverCore";

export const AuthService = {
  login: (data: Omit<ILogin, "id">) =>
    api.post<ILogin, Omit<ILogin, "id">>(`login`, data),
  // fetchCUDApi("login", "POST", data),
  //   logout: () => fetchCUDApi<ILogin>(`/users/${id}`, "POST"),
};
