"use server";
import { z } from "zod";
import { getTranslations } from "next-intl/server";
import { branchesSchema } from "../schema/branches";
import { BranchesService } from "@/lib/api/services/dashboard/branches";
import { IResponse } from "@/lib/type";

export async function createBranches(
  data: z.infer<Awaited<ReturnType<typeof branchesSchema>>>
): Promise<IResponse> {
  const t = await getTranslations();
  const branchSchema = branchesSchema(t);
  const parsed = branchSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      message: "Validation failed",
      data: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await BranchesService.create(parsed.data);

    return {
      success: true,
      error: null,
      message: response.message,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
      message: (error as Error).message,
    };
  }
}

export async function deleteBranches(id: number): Promise<IResponse> {
  try {
    const response = await BranchesService.destroy(id);

    return {
      success: true,
      error: null,
      message: response.message,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
      message: (error as Error).message,
    };
  }
}
