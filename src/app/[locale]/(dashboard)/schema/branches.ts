import { z } from "zod";
export function branchesSchema(t: (key: string) => string) {
  return z.object({
    id: z.number().optional(),
    branch_name: z
      .string({ message: t("commonValidations.required") })
      .nonempty({ message: t("commonValidations.required") }),
    location_id: z
      .number({ message: t("commonValidations.required") })
      .min(1, { message: t("commonValidations.required") }),
    address: z.string({ message: t("commonValidations.required") }),
    phone_number: z
      .string({ message: t("commonValidations.required") })
      .regex(/\d{10,12}$/, {
        message: t("commonValidations.phoneNumberLength"),
      })
      .regex(/^052/, {
        message: t("commonValidations.invalidPhoneNumber"),
      }),
    email: z
      .string({ message: t("commonValidations.required") })
      .email({ message: t("commonValidations.invalidEmail") }),
    latitude: z.string({ message: t("commonValidations.required") }),
    longitude: z.string({ message: t("commonValidations.required") }),
  });
}
