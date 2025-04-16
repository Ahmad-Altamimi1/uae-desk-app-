"use server";
import { z } from "zod";
import { serviceSchema } from "../schema/services";
import { ServicesService } from "@/lib/api/services/dashboard/services";
import { getTranslations } from "next-intl/server";
import { revalidateTag } from "next/cache";
import { tags } from "@/lib/api/endpoints/dashboard";

interface ServiceState {
  success: boolean;
  error: string | null;
  data: any;
  message: string;
}
export async function createServices(
  data: z.infer<Awaited<ReturnType<typeof serviceSchema>>>
): Promise<ServiceState> {
  const t = await getTranslations();
  const servicesSchema = serviceSchema(t);
  const parsed = servicesSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      message: "Validation failed",
      data: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await ServicesService.create(parsed.data);

    return {
      success: true,
      data: response,
      error: null,
      message: response.message,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
      data: {},
      message: (error as Error).message,
    };
  }
}
export async function deleteServices(id: number): Promise<ServiceState> {
  try {
    const response = await ServicesService.destroy(id).then(() =>
      revalidateTag(tags.getServices)
    );
    return {
      success: true,
      data: response,
      error: null,
      message: response,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
      data: {},
      message: (error as Error).message,
    };
  }
}

export async function updateService(
  data: z.infer<Awaited<ReturnType<typeof serviceSchema>>>
): Promise<ServiceState> {
  const t = await getTranslations();
  const servicesSchema = serviceSchema(t);
  const parsed = servicesSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      message: "Validation failed",
      data: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await ServicesService.update(parsed.data);
    revalidateTag(tags.getServices);

    return {
      success: true,
      data: response,
      error: null,
      message: response.message,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
      data: {},
      message: (error as Error).message,
    };
  }
}
