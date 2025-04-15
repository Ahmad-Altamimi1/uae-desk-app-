"use client";

import { useState } from "react";
import Invoice from "./invoice";
import Receipt from "./receipt";
import { Button } from "@/components/ui/button";
import { Printer, FileText, ReceiptIcon } from "lucide-react";
import { InvoiceDetails } from "@/entities/dashboard/invoice";

export default function InvoiceReceiptPage({ data }: { data: InvoiceDetails }) {
  const [view, setView] = useState<"both" | "invoice" | "receipt">("both");

  const handlePrint = () => {
    window.print();
  };

  const handleViewInvoice = () => {
    setView("invoice");
  };

  const handleViewReceipt = () => {
    setView("receipt");
  };

  return (
    <div className="min-h-screen  p-4 ">
      <div className="print-btn-container flex justify-center gap-4 mb-8 print:hidden">
        <Button
          className="bg-primary  text-white cursor-pointer"
          onClick={handlePrint}
        >
          <Printer className="mr-2 h-4 w-4" />
          Print both
        </Button>

        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary-50"
          onClick={handleViewInvoice}
        >
          <FileText className="mr-2 h-4 w-4" />
          View Invoice
        </Button>

        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary-50"
          onClick={handleViewReceipt}
        >
          <ReceiptIcon className="mr-2 h-4 w-4" />
          View Receipt
        </Button>
      </div>

      <div className="invoice-container">
        {view === "both" && (
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-1 invoice-print-area">
            <Invoice data={data} />
            <Receipt data={data} />
          </div>
        )}

        {view === "invoice" && <Invoice data={data} />}

        {view === "receipt" && <Receipt data={data} />}
      </div>
    </div>
  );
}
