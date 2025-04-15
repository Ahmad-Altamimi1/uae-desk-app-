"use server";
import { z } from "zod";
import { getLocale, getTranslations } from "next-intl/server";
import { CustomerService } from "@/api/services/dashboard"; // update as needed
import { permissionSchema } from "../schema/permission";
import { get } from "http";
import { PermissionService } from "@/lib/api/services/dashboard/permission";
import { createRoleCreateSchema } from "../schema/role";
import { RolesService } from "@/lib/api/services/dashboard/roles";
import { serviceSchema } from "../schema/services";
import { ServicesService } from "@/lib/api/services/dashboard/services";

interface ServiceState {
    success: boolean;
    error: string | null;
    data: any;
}
export async function createServices(
    data: z.infer<Awaited<ReturnType<typeof serviceSchema>>>
): Promise<ServiceState> {
    const t = await getTranslations();
    const servicesSchema = serviceSchema(t);
    const parsed = servicesSchema.safeParse(data);
    console.log("datadatadatadata",data);

    if (!parsed.success) {
        return {
            success: false,
            error: "Validation failed",
            data: parsed.error.flatten().fieldErrors,
        };
    }

    try {
        const locale = await getLocale();
        const response = await ServicesService.create(parsed.data);
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

