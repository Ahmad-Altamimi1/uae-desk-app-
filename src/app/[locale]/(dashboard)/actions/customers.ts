"use server";
import {
  addTaxIdRequest,
  CustomerSubmitReviewRequest,
  ICustomerData,
  storeFtaMedia,
  storeFtaMediaRequest,
  updateFtaMediaRequest,
} from "@/entities/dashboard/customers";
import { z } from "zod";
import { getTranslations } from "next-intl/server";
import { CustomerService } from "@/api/services/dashboard";
import { customerValidation } from "../schema/customers";
import { tags } from "@/lib/api/endpoints/dashboard";
import { revalidateTag } from "next/cache";
import toSnakeCase from "@/utils/toSnackCase";
import { ISelectOption } from "@/utils/type";
import { serviceFormsFieldName } from "../dashboard/customers/[customerId]/createservices/components/servicesForms/serviceFormsFieldsName";
import { RequestDocument } from "@/entities/dashboard";
import { IResponse } from "@/lib/type";

export interface CustomerState extends IResponse<{ id: number }> {
  errors?: Record<keyof ICustomerData, string>;
  id?: number;
}
export async function createCustomer(
  data: z.infer<Awaited<ReturnType<typeof customerValidation>>>
): Promise<CustomerState> {
  const t = await getTranslations();
  const customerSchema = customerValidation(t);
  const parsed = customerSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      data: parsed.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  try {
    const response = await CustomerService.create(toSnakeCase(parsed.data));
    revalidateTag(tags.getCustomers);

    return {
      success: true,
      data: response,
      message: "Customer created successfully",
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message,
      data: {},
      message: "",
      ...error,
    };
  }
}

export async function updateCustomer(
  data: z.infer<Awaited<ReturnType<typeof customerValidation>>>
): Promise<CustomerState> {
  const t = await getTranslations();
  const customerSchema = customerValidation(t);
  const parsed = customerSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      data: parsed.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  try {
    const response = await CustomerService.update(toSnakeCase(parsed.data));
    revalidateTag(tags.getCustomers);

    return {
      success: true,
      data: response,
      message: "Customer updated successfully",
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message,
      data: {},
      message: "",
      ...error,
    };
  }
}
export async function handleFileUpload(
  customerId: Promise<string>,
  documentType: ISelectOption,
  files: File[]
): Promise<CustomerState> {
  const formData = new FormData();

  // Append your data to the FormData
  const id = await customerId;
  formData.append("id", id);
  formData.append("document_name", documentType.value);

  // Append each file with the name 'media[]'
  for (let i = 0; i < files.length; i++) {
    formData.append("media[]", files[i]);
  }

  try {
    const response = await CustomerService.uploadMedia(formData);
    revalidateTag(tags.CustomerShow);

    return {
      success: true,
      data: response,
      message: "File uploaded successfully",
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message,
      data: {},
      message: "",
      ...error,
    };
  }
}

export async function deleteMedia(id: number): Promise<CustomerState> {
  try {
    const response = await CustomerService.deleteMedia(id);
    revalidateTag(tags.CustomerShow);

    return {
      success: true,
      data: response,
      message: "File deleted successfully",
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message,
      data: {},
      message: "",
      ...error,
    };
  }
}
export async function submitVerification(id: number): Promise<CustomerState> {
  try {
    const response = await CustomerService.submitVerification(id);

    return {
      success: true,
      data: response,
      message: "File deleted successfully",
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message,
      data: {},
      message: "",
      ...error,
    };
  }
}

export async function saveDocumentDetailsAction(
  data: typeof serviceFormsFieldName,
  id: string
): Promise<CustomerState> {
  try {
    const response = await CustomerService.saveDocumentDetails(data, id);

    return {
      success: true,
      data: response,
      message: response.message,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message,
      data: {},
      message: "",
      ...error,
    };
  }
}
export async function RequestDocumentAction(
  data: RequestDocument,
  id: number
): Promise<CustomerState> {
  try {
    const response = await CustomerService.requestDocument(data, id);

    return {
      success: true,
      data: response,
      message: response.message,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message,
      data: {},
      message: "",
      ...error,
    };
  }
}
export async function storeFtaMediaAction(
  data: storeFtaMediaRequest
): Promise<CustomerState> {
  try {
    const response = await CustomerService.storeFtaMedia(data);

    return {
      success: true,
      data: response,
      message: response.message,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message,
      data: {},
      message: "",
      ...error,
    };
  }
}
export async function addTaxIdAction(
  data: addTaxIdRequest
): Promise<CustomerState> {
  try {
    const response = await CustomerService.addTaxId(data);

    return {
      success: true,
      data: response,
      message: response.message,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message,
      data: {},
      message: "",
      ...error,
    };
  }
}
export async function submitReviewAction(
  data: CustomerSubmitReviewRequest
): Promise<CustomerState> {
  try {
    const response = await CustomerService.submitReview(data);

    return {
      success: true,
      data: response,
      message: response.message,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message,
      data: {},
      message: "",
      ...error,
    };
  }
}
export async function updateFtaMediaAction(
  data: updateFtaMediaRequest
): Promise<CustomerState> {
  try {
    const response = await CustomerService.updateFtaMedia(data);

    return {
      success: true,
      data: response,
      message: response.message,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message,
      data: {},
      message: "",
      ...error,
    };
  }
}
