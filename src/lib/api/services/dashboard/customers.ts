import {
  IResponseCustomer,
  IRequestCustomer,
  IUploadMedia,
  RequestDocument,
  storeFtaMediaRequest,
  addTaxIdRequest,
  CustomerSubmitReviewRequest,
  updateFtaMediaRequest,
} from "@/entities/dashboard";
import { api } from "../../serverCore";
import { serviceFormsFieldName } from "@/app/[locale]/(dashboard)/dashboard/customers/[customerId]/createservices/components/servicesForms/serviceFormsFieldsName";
import { IResponse } from "@/lib/type";

export const CustomerService = {
  create: (data: Omit<IRequestCustomer, "id">) =>
    api.post<IResponse<{ id: number }>, Omit<IRequestCustomer, "id">>(
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
  saveDocumentDetails: (data: typeof serviceFormsFieldName, id: string) =>
    api.post("saveDocumentDetails", { ...data, id }),
  requestDocument: (data: RequestDocument, id: number) =>
    api.post("CustomerRequestDocument", { ...data, id }),
  storeFtaMedia: (data: storeFtaMediaRequest) =>
    api.post("storeFtaMedia", data),
  updateFtaMedia: (data: updateFtaMediaRequest) =>
    api.post("CustomerFtaDocumentUpdate", data),
  addTaxId: (data: addTaxIdRequest) => api.post("addTaxId", data),
  submitReview: (data: CustomerSubmitReviewRequest) =>
    api.post("CustomerSubmitReview", data),
};
