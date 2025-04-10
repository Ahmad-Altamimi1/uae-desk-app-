import { z } from "zod";
export const createRoleCreateSchema = (t: (key: string) => string) => {
  return z.object({
    name: z.string({ message: t("name.error.required") }),
    code: z
      .string({ message: t("code.error.required") })
      .min(1, { message: t("name.error.minLength") })
      .max(50, { message: t("name.error.maxLength") }),
    permission: z
      .string({ message: t("name.error.required") })
      .min(1, { message: t("name.error.minLength") })
      .max(50, { message: t("name.error.maxLength") }),
  });
};
