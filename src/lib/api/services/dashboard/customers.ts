import {
  IResponseCustomer,
  IRequestCustomer,
  IUploadMedia,
} from "@/entities/dashboard";
import { api } from "../../serverCore";

export const CustomerService = {
  create: (data: Omit<IRequestCustomer, "id">) =>
    api.post<IResponseCustomer, Omit<IRequestCustomer, "id">>(
      `CustomerStore`,
      data
    ),
  update: (data: IRequestCustomer) =>
    api.post<IResponseCustomer, IRequestCustomer>(`CustomerUpdate`, data),
  uploadMedia: (data: IUploadMedia) =>
    api.post<IResponseCustomer, IUploadMedia>(`CustomerMediaStore`, data),
  destroy: (id: number) =>
    api.post("CustomerDestroy", { id }), 

  deleteMedia: (id: number) =>
    api.delete<void, { id: number }>(`deleteCustomerMediaDelete`, {
      id,
    }),

};


