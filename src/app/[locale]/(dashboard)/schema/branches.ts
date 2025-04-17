

import { number, z } from "zod";
export function branchesSchema(t: (key: string) => string) {
  return z.object({
    id: z.number().optional(),
    branch_name: z.string().nonempty({ message: t("commonValidations.required") }),
    location_id: z.number().min(1, { message: t("forms.locationId.error.required") }),
    address: z.string().optional(),
    phone_number: z.string().optional(),
    email: z.string().optional(),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
  });
}





