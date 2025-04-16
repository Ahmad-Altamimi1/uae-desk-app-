import { z } from "zod";
export function serviceSchema(t: (key: string) => string) {
  return z.object({
    id: z.number().optional(),
    name: z
      .string({ message: t("commonValidations.required") })
      .min(3, { message: t("commonValidations.minLength") }),
  });
}
