"use server";
import { z } from "zod";
import { getTranslations } from "next-intl/server";
import { permissionSchema } from "../schema/permission";
import { PermissionService } from "@/lib/api/services/dashboard/permission";

interface PermissionState {
  success: boolean;
  error: string | null;
  data: {
    name: string[] | undefined;
  };
}

export async function createPermission(
  data: z.infer<Awaited<ReturnType<typeof permissionSchema>>>
): Promise<PermissionState> {
  const t = await getTranslations();
  const permissionsSchema = permissionSchema(t);
  const parsed = permissionsSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      data: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await PermissionService.create(parsed.data);

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
