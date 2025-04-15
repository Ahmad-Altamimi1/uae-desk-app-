"use server";
import { z } from "zod";
import { serviceSchema } from "../schema/services";
import { ServicesService } from "@/lib/api/services/dashboard/services";
import { getLocale, getTranslations } from "next-intl/server";

interface ServiceState {
    success: boolean;
    error: string | null;
    data: any;
    message: string
}
export async function createServices(
    data: z.infer<Awaited<ReturnType<typeof serviceSchema>>>
): Promise<ServiceState> {
    const t = await getTranslations();
    const servicesSchema = serviceSchema(t);
    const parsed = servicesSchema.safeParse(data);
    console.log("datadatadatadata", data);

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
        const response = await ServicesService.create(parsed.data);
        console.log("response", response);

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
export async function deleteServices(
    id: number
): Promise<ServiceState> {



    try {
        const response = await ServicesService.destroy(id)

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

