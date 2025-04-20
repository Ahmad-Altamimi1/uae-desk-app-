"use server";
import { z } from "zod";
import { getTranslations } from "next-intl/server";
import { branchesSchema } from "../schema/branches";
import { BranchesService } from "@/lib/api/services/dashboard/branches";
import { revalidateTag } from "next/cache";
import { tags } from "@/lib/api/endpoints/dashboard";

interface BranchesState {
  success: boolean;
  error: string | null;
  data: any;
  message: string;
}
export async function createBranches(
  data: z.infer<Awaited<ReturnType<typeof branchesSchema>>>
): Promise<BranchesState> {
  const t = await getTranslations();
  const branchSchema = branchesSchema(t);
  const parsed = branchSchema.safeParse(data);
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
    const response = await BranchesService.create(parsed.data);
    revalidateTag(tags.getBranches);

    // console.log("response", response);

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

export async function updateBranch(
  data: z.infer<Awaited<ReturnType<typeof branchesSchema>>>
): Promise<BranchesState> {
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
    const response = await BranchesService.update(parsed.data);

    revalidateTag(tags.getBranches);

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
export async function deleteBranches(id: number): Promise<BranchesState> {
  try {
    const response = await BranchesService.destroy(id);
    revalidateTag(tags.getBranches);

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
