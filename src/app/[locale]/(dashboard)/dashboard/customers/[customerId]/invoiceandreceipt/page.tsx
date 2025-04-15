import React from "react";
import InvoiceReceiptPage from "../receipt/components/invoice-receipt-page";
import { api } from "@/lib/api/serverCore";
import { InvoiceDetails } from "@/entities/dashboard/invoice";
interface IInvoiceProps {
  params: Promise<{ customerId: string }>;
}
export default async function InvoiceAndReceipt({ params }: IInvoiceProps) {
  const customerId = await params.then((e) => e.customerId);

  const data = await api.get<InvoiceDetails>(["CustomerInvoices", customerId]);

  return <InvoiceReceiptPage data={data} />;
}
