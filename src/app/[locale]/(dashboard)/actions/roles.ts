"use server";
import { z } from "zod";
import { getLocale, getTranslations } from "next-intl/server";
import { CustomerService } from "@/api/services/dashboard"; // update as needed
import { permissionSchema } from "../schema/permission";
import { get } from "http";
import { PermissionService } from "@/lib/api/services/dashboard/permission";
import { createRoleCreateSchema } from "../schema/role";
import { RolesService } from "@/lib/api/services/dashboard/roles";
import toSnakeCase from "@/utils/toSnackCase";
import { revalidateTag } from "next/cache";
import { tags } from "@/lib/api/endpoints/dashboard";

interface RoleState {
    success: boolean;
    error: string | null;
    data: any;
}

const transformRoleData = (
  parsedData: z.infer<ReturnType<typeof createRoleCreateSchema>>
) => {
  return {
    name: parsedData?.name,
    code: parsedData?.code,
    permissions: parsedData?.permissions,
   
  };
};
export async function createRoles(
    data: z.infer<Awaited<ReturnType<typeof createRoleCreateSchema>>>
): Promise<RoleState> {
    const t = await getTranslations();
    const rolesSchema = createRoleCreateSchema(t);
    const parsed = rolesSchema.safeParse(data);
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


export async function updateRoles(
    data: z.infer<Awaited<ReturnType<typeof createRoleCreateSchema>>>
): Promise<RoleState> {
    const t = await getTranslations();
    const rolesSchema = createRoleCreateSchema(t);
    const parsed = rolesSchema.safeParse(data);
    console.log("datadatadatadata",data);

    if (!parsed.success) {
        return {
            success: false,
            error: "Validation failed",
            data: parsed.error.flatten().fieldErrors,
        };
    }
    const backendData = transformRoleData(parsed.data);

    try {
        const locale = await getLocale();
        const response = await RolesService.update(toSnakeCase(parsed.data));
            revalidateTag(tags.getRoles);
        
        console.log("response", response);

        return {
            success: true,
            data: response,
            message: "role updated successfully",
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
        // return {
        //     success: false,
        //     error: (error as Error).message,
        //     data: {},
        // };
    }
}

