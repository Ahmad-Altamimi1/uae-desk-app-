"use server";
import { z } from "zod";
export async function getCustomerSchemaServerData() {
  return z.object({
    serviceId: z.array(z.string()),
    servicePrice: z.record(z.number()),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    businessName: z.string().min(1),
    phoneNumber: z.string().min(1),
    secondNumber: z.string().optional(),
    email: z.string().email(),
    address: z.string().optional(),
    status: z.boolean().optional(),
    taxId: z.string().optional(),
    price: z.number(),
    vatValue: z.number().optional(),
    branchId: z.string(),
    transactionRefrenceNumber: z.string().optional(),
    ftaRefrence: z.string().optional(),
    ftaPassword: z.string().optional(),
    ftaUserName: z.string().optional(),
    paymentMethod: z.string().optional(),
    gmailUserName: z.string().optional(),
    gmailPassword: z.string().optional(),
    entries: z
      .array(
        z.object({
          date: z.string(),
          amount: z.number(),
          description: z.string().optional(),
        })
      )
      .optional(),
  });
}
