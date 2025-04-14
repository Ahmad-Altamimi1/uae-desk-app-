"use server";
import { z } from "zod";
import { getTranslations } from "next-intl/server";
import { CustomerService } from "@/api/services/dashboard";
import { customerValidation } from "../schema/customers";
import { tags } from "@/lib/api/endpoints/dashboard";
import { revalidateTag } from "next/cache";
import toSnakeCase from "@/utils/toSnackCase";
import { ISelectOption } from "@/utils/type";

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
  const data = {
    id: Number(await customerId),
    document_name: String(documentType.value),
    media: files.map((file) => ({
      file: file,
      filename: file.name,
      type: file.type,
      size: file.size,
    })),
  };

  try {
    const response = await CustomerService.uploadMedia(data);
    console.log("responseresponseresponse", response);

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
        message: "",
        error: (error as { message: string })?.message,
        ...error,
      };
    }
  }
}
