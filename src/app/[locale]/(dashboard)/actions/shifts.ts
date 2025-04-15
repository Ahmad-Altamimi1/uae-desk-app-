"use server";
import { z } from "zod";
import { getLocale, getTranslations } from "next-intl/server";
import { CustomerService } from "@/api/services/dashboard"; // update as needed
import { permissionSchema } from "../schema/permission";
import { get } from "http";
import { PermissionService } from "@/lib/api/services/dashboard/permission";
import { shiftsSchema } from "../schema/shifts";
import { ShiftsService } from "@/lib/api/services/dashboard/shifts";

interface ShiftsState {
  success: boolean;
  error: string | null;
  data: any;
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
      data: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const locale = await getLocale();
    const response = await ShiftsService.create(parsed.data);
    console.log("response", response);

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
