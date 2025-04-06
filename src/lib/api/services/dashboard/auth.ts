import { ILoginRequest, ILoginResponse } from "@/entities/dashboard";
import { api } from "../../serverCore";

export const AuthService = {
  login: (data: Omit<ILoginRequest, "id">) =>
    api.post<ILoginResponse, Omit<ILoginRequest, "id">>(`login`, data),
  // fetchCUDApi("login", "POST", data),
  //   logout: () => fetchCUDApi<ILogin>(`/users/${id}`, "POST"),
};
