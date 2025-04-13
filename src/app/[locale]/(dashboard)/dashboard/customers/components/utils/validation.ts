import { z } from "zod";

export const customerValidation = (t: (key: string) => string) => {
  return z.object({
    firstName: z.string().min(1, { message: t("firstName.error.required") }),
    lastName: z.string().min(1, { message: t("lastName.error.required") }),
    businessName: z
      .string()
      .min(1, { message: t("businessName.error.required") }),
    phoneNumber: z
      .string()
      .min(1, { message: t("phoneNumber.error.required") }),
    email: z.string().email({ message: t("email.error.invalidEmail") }),
    address: z.string().optional(),
    status: z.boolean().optional(),
    taxId: z.string().optional(),
    price: z.coerce.number().min(1, { message: t("price.error.required") }),
    vatValue: z.coerce.number().optional(),
    branchId: z.string().min(1, { message: t("branchId.error.required") }),
    transactionRefrenceNumber: z.string().optional(),
    ftaRefrence: z.string().optional(),
    ftaPassword: z.string().optional(),
    ftaUserName: z.string().optional(),
    paymentMethod: z.string().optional(),
    gmailUserName: z.string().optional(),
    gmailPassword: z.string().optional(),
    serviceId: z.array(z.string()).default([]),
    servicePrice: z.record(z.number()).default({}),
    entries: z
      .array(
        z.object({
          date: z
            .string()
            .min(1, { message: t("entries.fields.date.error.required") }),
          amount: z
            .number()
            .min(1, { message: t("entries.fields.amount.error.required") }),
          description: z.string().optional(),
        })
      )
      .optional(),
  });
};
