import { IResponseCustomer, IRequestCustomer } from "@/entities/dashboard";
import { api } from "../../serverCore";

export const CustomerService = {
  create: (data: Omit<IRequestCustomer, "id">) =>
    api.post<IResponseCustomer, Omit<IRequestCustomer, "id">>(
      `CustomerCreate`,
      data
    ),
  // fetchCUDApi("login", "POST", data),
  //   logout: () => fetchCUDApi<ILogin>(`/users/${id}`, "POST"),
};
