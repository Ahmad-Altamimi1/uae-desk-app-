"use server";
import { z } from "zod";
import { getLocale } from "next-intl/server";
import { CustomerService } from "@/api/services/dashboard"; // update as needed
import { getCustomerSchemaServerData } from "../schema/customers";

interface CustomerState {
  success: boolean;
  error: string | null;
  data: any;
}

export async function createCustomer(
  data: z.infer<Awaited<ReturnType<typeof getCustomerSchemaServerData>>>
): Promise<CustomerState> {
  const customerSchema = await getCustomerSchemaServerData();
  const parsed = customerSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      data: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const locale = await getLocale();
    const response = await CustomerService.create(parsed.data);

    return {
      success: true,
      data: response,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
      data: {},
    };
  }
}
