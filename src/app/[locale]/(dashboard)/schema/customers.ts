import { CustomerStatus } from "@/types/enums";
import { z } from "zod";
export const customerValidation = (t: (key: string) => string) => {
  return z.object({
    id: z.number().optional(),
    firstName: z.string().min(1, { message: t("firstName.error.required") }),
    lastName: z.string().min(1, { message: t("lastName.error.required") }),
    businessName: z
      .string()
      .min(1, { message: t("businessName.error.required") }),
    phoneNumber: z
      .string()
      .min(1, { message: t("phoneNumber.error.required") })
      .max(10, { message: t("phoneNumber.error.maxLength") })
      .regex(/^052/, { message: t("phoneNumber.error.invalidFormat") }),
    email: z.string().email({ message: t("email.error.invalidEmail") }),
    address: z.string().optional(),
    status: z.nativeEnum(CustomerStatus).optional(),
    taxId: z.string().optional(),
    price: z.coerce.number().optional(),
    vatValue: z.coerce.number().optional(),
    branchId: z.number().min(1, { message: t("branchId.error.required") }),
    transactionRefrenceNumber: z.string().optional(),
    ftaRefrence: z.string().optional(),
    ftaPassword: z.string().optional(),
    ftaUserName: z.string().optional(),
    paymentMethod: z.string().optional(),
    gmailUserName: z.string().optional(),
    gmailPassword: z.string().optional(),
    serviceId: z
      .array(z.number())
      .min(1, { message: t("serviceId.error.required") }),
    // servicePrice: z.record(z.number()).default({}),
    upcoming_payments: z
      .array(
        z.object({
          date: z
            .string()
            .min(1, { message: t("entries.fields.date.error.required") }),
          amount: z
            .string()
            .min(1, { message: t("entries.fields.amount.error.required") }),
          description: z.string().optional(),
        })
      )
      .optional(),
  });
};
