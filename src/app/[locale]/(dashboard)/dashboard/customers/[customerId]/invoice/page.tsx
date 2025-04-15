import Invoice from "./components/invoice";
import { InvoiceDetails } from "@/entities/dashboard/invoice";
import { api } from "@/lib/api/serverCore";

interface IInvoiceProps {
  params: Promise<{ customerId: string }>;
}
export default async function InvoicePage({ params }: IInvoiceProps) {
  const customerId = await params.then((e) => e.customerId);

  const data = await api.get<InvoiceDetails>(["CustomerInvoices", customerId]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Failed to load invoice data</div>
      </div>
    );
  }

  return <Invoice data={data} />;
}
