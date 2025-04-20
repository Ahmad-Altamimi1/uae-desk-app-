import { number, z } from "zod";

export function shiftsSchema(t: (key: string) => string) {
  return z.object({
    name: z.string({ message: t("commonValidations.required") }),
    id: z.number().optional(),
    start_time: z.string({ message: t("commonValidations.required") }),
    end_time: z.string({ message: t("commonValidations.required") }),
  });
  // .refine(
  //   (data) => data.end_time > data.start_time,
  //   {
  //     message: t("commonValidations.endDateAfterStartDate"),
  //     path: ["end_time"],
  //   }
  // );
}
