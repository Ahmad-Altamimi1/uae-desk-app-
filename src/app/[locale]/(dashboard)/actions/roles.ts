"use server";
import { z } from "zod";
import { getLocale, getTranslations } from "next-intl/server";
import { CustomerService } from "@/api/services/dashboard"; // update as needed
import { permissionSchema } from "../schema/permission";
import { get } from "http";
import { PermissionService } from "@/lib/api/services/dashboard/permission";
import { createRoleCreateSchema } from "../schema/role";
import { RolesService } from "@/lib/api/services/dashboard/roles";

interface RoleState {
    success: boolean;
    error: string | null;
    data: any;
}
export async function createRoles(
    data: z.infer<Awaited<ReturnType<typeof createRoleCreateSchema>>>
): Promise<RoleState> {
    const t = await getTranslations();
    const rolesSchema = createRoleCreateSchema(t);
    const parsed = rolesSchema.safeParse(data);

    if (!parsed.success) {
        return {
            success: false,
            error: "Validation failed",
            data: parsed.error.flatten().fieldErrors,
        };
    }

    try {
        const locale = await getLocale();
        const response = await RolesService.create(parsed.data);
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

