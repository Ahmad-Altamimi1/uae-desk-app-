import { z } from "zod";
export function branchesSchema(t: (key: string) => string) {
  return z.object({
    branch_name: z
      .string({ message: t("commonValidations.required") })
      .nonempty({ message: t("commonValidations.required") }),
    location_id: z
      .number({ message: t("commonValidations.required") })
      .min(1, { message: t("commonValidations.required") }),
    address: z.string({ message: t("commonValidations.required") }),
    phone_number: z.string({ message: t("commonValidations.required") }),
    email: z.string({ message: t("commonValidations.required") }),
    latitude: z.string({ message: t("commonValidations.required") }),
    longitude: z.string({ message: t("commonValidations.required") }),
  });
}
