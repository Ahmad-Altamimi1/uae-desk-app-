"use server";
import { z } from "zod";
import { getLocale, getTranslations } from "next-intl/server";
import { shiftsSchema } from "../schema/shifts";
import { ShiftsService } from "@/lib/api/services/dashboard/shifts";
import { revalidateTag } from "next/cache";
import { tags } from "@/lib/api/endpoints/dashboard";

interface ShiftsState {
  success: boolean;
  error: string | null;
  data: any;
  message: string;
}

export async function createShifts(
  data: z.infer<Awaited<ReturnType<typeof shiftsSchema>>>
): Promise<ShiftsState> {
  const t = await getTranslations();
  const shiftSchema = shiftsSchema(t);
  const parsed = shiftSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      message: "Validation failed",
      data: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const locale = await getLocale();
    const response = await ShiftsService.create(parsed.data);
    revalidateTag(tags.getShifts);

    console.log("response", response);

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
export async function deleteShifts(id: number): Promise<ShiftsState> {
  try {
    const response = await ShiftsService.destroy(id);
    revalidateTag(tags.getShifts);

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
export async function handleUpdateStatus(
  id: number,
  status: boolean
): Promise<ShiftsState> {
  try {
    const response = await ShiftsService.updateStatus(id, status);

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



export async function updateShift(
  data: z.infer<Awaited<ReturnType<typeof shiftsSchema>>>
): Promise<ShiftsState> {
  const t = await getTranslations();
  const shiftSchema = shiftsSchema(t);
  const parsed = shiftSchema.safeParse(data);

  if (!parsed.success) {
    return {

      success: false,
      error: "Validation failed",
      message: "Validation failed",
      data: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await ShiftsService.update(parsed.data);

    revalidateTag(tags.getShifts);

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
