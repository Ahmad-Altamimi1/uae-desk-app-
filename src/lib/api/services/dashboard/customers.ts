import {
  IResponseCustomer,
  IRequestCustomer,
  IUploadMedia,
  RequestDocument,
} from "@/entities/dashboard";
import { api } from "../../serverCore";
import { serviceFormsFieldName } from "@/app/[locale]/(dashboard)/dashboard/customers/[customerId]/createservices/components/servicesForms/serviceFormsFieldsName";

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
  destroy: (id: number) => api.post("CustomerDestroy", { id }),
  submitVerification: (id: number) =>
    api.post("CustomerSubmitVerification", { id }),

  deleteMedia: (id: number) =>
    api.delete<void, { id: number }>(`deleteCustomerMediaDelete`, {
      id,
    }),
  saveDocumentDetails: (data: typeof serviceFormsFieldName, id: number) =>
    api.post("saveDocumentDetails", { ...data, id }),
  requestDocument: (data: RequestDocument, id: number) =>
    api.post("CustomerRequestDocument", { ...data, id }),
};
