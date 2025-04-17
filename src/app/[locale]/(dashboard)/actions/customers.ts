"use server";
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

interface CustomerState {
  success: boolean;
  error: Record<string, [] | string> | null;
  data: Record<string, any>;
  message: string | null;
}

const transformCustomerData = (
  parsedData: z.infer<ReturnType<typeof customerValidation>>
) => {
  return {
    service_id: parsedData?.serviceId,
    service_price: parsedData?.price,
    first_name: parsedData?.firstName,
    last_name: parsedData?.lastName,
    business_name: parsedData?.businessName,
    phone_number: parsedData?.phoneNumber,
    second_number: "",
    email: parsedData?.email,
    address: parsedData?.address,
    status: parsedData?.status,
    tax_id: parsedData?.taxId,
    price: parsedData?.price,
    vat_value: parsedData?.vatValue,
    branch_id: parsedData?.branchId,
    transaction_refrence_number: parsedData?.transactionRefrenceNumber,
    fta_refrence: parsedData?.ftaRefrence,
    fta_password: parsedData?.ftaPassword,
    fta_user_name: parsedData?.ftaUserName,
    payment_method: parsedData?.paymentMethod,
    gmail_user_name: parsedData?.gmailUserName,
    gmail_password: parsedData?.gmailPassword,
    entries: parsedData?.entries,
  };
};

export async function createCustomer(
  data: z.infer<Awaited<ReturnType<typeof customerValidation>>>
): Promise<CustomerState> {
  const t = await getTranslations();
  const customerSchema = customerValidation(t);
  const parsed = customerSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: {},
      message: "Validation failed",
      data: parsed.error.flatten().fieldErrors,
    };
  }

  const backendData = transformCustomerData(parsed.data);

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
    if (typeof error === "object") {
      return {
        success: false,
        error: error?.message,
        data: {},
        message: "",
        ...error,
      };
    }
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
    };
  }

  const backendData = transformCustomerData(parsed.data);

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
    if (typeof error === "object") {
      return {
        success: false,
        error: error?.message,
        ...error,
      };
    }
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
    if (typeof error === "object") {
      return {
        success: false,
        data: {},
        message: (error as { message: string })?.message,
        error: (error as { message: string })?.message,
        ...error,
      };
    }
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
    if (typeof error === "object") {
      return {
        success: false,
        data: {},
        message: (error as { message: string })?.message,
        error: (error as { message: string })?.message,
        ...error,
      };
    }
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
    if (typeof error === "object") {
      return {
        success: false,
        data: {},
        message: (error as { message: string })?.message,
        error: (error as { message: string })?.message,
        ...error,
      };
    }
  }
}

export async function saveDocumentDetailsAction(
  data: typeof serviceFormsFieldName,
  id: number
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
    if (typeof error === "object") {
      return {
        success: false,
        data: {},
        message: (error as { message: string })?.message,
        error: (error as { message: string })?.message,
        ...error,
      };
    }
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
    if (typeof error === "object") {
      return {
        success: false,
        data: {},
        message: (error as { message: string })?.message,
        error: (error as { message: string })?.message,
        ...error,
      };
    }
  }
}
