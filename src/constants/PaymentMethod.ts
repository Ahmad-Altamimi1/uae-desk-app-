import { PaymentMethod } from "@/types/enums";

export const paymentMethodOptions = [
  { label: "Cash", value: PaymentMethod.CASH },
  { label: "Credit Card", value: PaymentMethod.CREDIT_CARD },
  { label: "PayPal", value: PaymentMethod.PAYPAL },
  { label: "Bank Transfer", value: PaymentMethod.BANK_TRANSFER },
];
