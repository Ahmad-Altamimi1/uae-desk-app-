"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PrinterIcon, FileTextIcon, ReceiptIcon } from "lucide-react"
import Invoice from "./invoice"
import Receipt from "./receipt"

// Mock data - in a real app, this would come from your API or props
const mockData = {
  customer: {
    first_name: "John",
    last_name: "Doe",
    business_name: "Service",
    phone_number: "0542563256",
    email: "admin9654@cast.com",
    tax_id: "",
    vat_value: 0,
    price: 500.0,
  },
  companyAddress: "N/A",
  companyPhone: "065378786",
  companyEmail: "info@hlauae.com",
  invoiceNumber: "DB-000004",
  receiptNumber: "R-000004",
  date: "2025-04-15",
  receiptDate: "2025-04-15",
  created: { name: "Super Admin" },
  payment_method: "N/A",
  services: [{ name: "Accounting Service", price: 500.0 }],
  vatAmount: 0.0,
  companyLogo: "/logo.png",
}

export default function InvoiceReceiptSystem() {
  const [activeView, setActiveView] = useState<"both" | "invoice" | "receipt">("both")

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex justify-end space-x-2 print:hidden">
        <Button onClick={handlePrint} className="bg-emerald-700 hover:bg-emerald-800">
          <PrinterIcon className="mr-2 h-4 w-4" /> Print Both
        </Button>
        <Button
          onClick={() => setActiveView("invoice")}
          variant="outline"
          className="border-emerald-700 text-emerald-700 hover:bg-emerald-50"
        >
          <FileTextIcon className="mr-2 h-4 w-4" /> View Invoice
        </Button>
        <Button
          onClick={() => setActiveView("receipt")}
          variant="outline"
          className="border-emerald-700 text-emerald-700 hover:bg-emerald-50"
        >
          <ReceiptIcon className="mr-2 h-4 w-4" /> View Receipt
        </Button>
      </div>

      <Tabs defaultValue="both" className="print:hidden">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="both" onClick={() => setActiveView("both")}>
            Both
          </TabsTrigger>
          <TabsTrigger value="invoice" onClick={() => setActiveView("invoice")}>
            Invoice
          </TabsTrigger>
          <TabsTrigger value="receipt" onClick={() => setActiveView("receipt")}>
            Receipt
          </TabsTrigger>
        </TabsList>

        <TabsContent value="both" className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
          <Invoice data={mockData} />
          <Receipt data={mockData} />
        </TabsContent>

        <TabsContent value="invoice">
          <div className="max-w-3xl mx-auto">
            <Invoice data={mockData} />
          </div>
        </TabsContent>

        <TabsContent value="receipt">
          <div className="max-w-3xl mx-auto">
            <Receipt data={mockData} />
          </div>
        </TabsContent>
      </Tabs>

      {/* Print view */}
      <div className="hidden print:block">
        {activeView === "both" && (
          <div className="grid grid-cols-2 gap-6">
            <Invoice data={mockData} />
            <Receipt data={mockData} />
          </div>
        )}
        {activeView === "invoice" && <Invoice data={mockData} />}
        {activeView === "receipt" && <Receipt data={mockData} />}
      </div>
    </div>
  )
}
