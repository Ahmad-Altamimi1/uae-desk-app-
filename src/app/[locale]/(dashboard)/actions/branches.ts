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
import { branchesSchema } from "../schema/branches";
import { BranchesService } from "@/lib/api/services/dashboard/branches";

interface BranchesState {
    success: boolean;
    error: string | null;
    data: any;
    message:string,
}
export async function createBranches(
    data: z.infer<Awaited<ReturnType<typeof branchesSchema>>>
): Promise<BranchesState> {
    const t = await getTranslations();
    const branchSchema = branchesSchema(t);
    const parsed = branchSchema.safeParse(data);
    console.log("datadatadatadata",data);

    if (!parsed.success) {
        return {
            success: false,
            error: "Validation failed",
            message:"Validation failed",
            data: parsed.error.flatten().fieldErrors,
        };
    }

    try {
        const locale = await getLocale();
        const response = await BranchesService.create(parsed.data);
        console.log("response", response);

        return {
            success: true,
            data: response,
            error: null,
            message:response.message
        };
    } catch (error) {
        return {
            success: false,
            error: (error as Error).message,
            data: {},
            message:(error as Error).message
        };
    }


   
}

export async function deleteBranches(
    id: number
): Promise<BranchesState> {



    try {
        const response = await BranchesService.destroy(id)

        return {
            success: true,
            data: response,
            error: null,
            message: response.message
        };
    } catch (error) {
        return {
            success: false,
            error: (error as Error).message,
            data: {},
            message: (error as Error).message
        };
    }
}