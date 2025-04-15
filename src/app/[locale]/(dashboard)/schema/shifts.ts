import { z } from "zod";

export function shiftsSchema(t: (key: string) => string) {
  return z.object({
    name: z.string({ message: t("commonValidations.required") }),
    start_time: z.string({ message: t("commonValidations.required") }),
    end_time: z.string({ message: t("commonValidations.required") }),
    is_active: z.boolean({ required_error: t("commonValidations.required") }),
  });
}
