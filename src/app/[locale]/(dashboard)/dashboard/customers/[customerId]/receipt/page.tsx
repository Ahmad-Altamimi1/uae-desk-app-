import { api } from "@/lib/api/serverCore";
import PrintButton from "../invoice/components/PrintButton";
import Receipt from "./components/receipt";
import { InvoiceDetails } from "@/entities/dashboard/invoice";

interface IInvoiceProps {
  params: Promise<{ customerId: string }>;
}
export default async function ReceiptPage({ params }: IInvoiceProps) {
  const customerId = await params.then((e) => e.customerId);

  const data = await api.get<InvoiceDetails>(["CustomerInvoices", customerId]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Failed to load receipt data</div>
      </div>
    );
  }

  return <Receipt data={data} />;
}
