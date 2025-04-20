import {
  ILoginRequest,
  ILoginResponse,
  ILogoutResponse,
} from "@/entities/dashboard";
import { api } from "../../serverCore";

export const AuthService = {
  login: (data: Omit<ILoginRequest, "id">) =>
    api.post<ILoginResponse, Omit<ILoginRequest, "id">>(`login`, data),
  logout: () => api.post<ILogoutResponse, void>(`logout`),
};
