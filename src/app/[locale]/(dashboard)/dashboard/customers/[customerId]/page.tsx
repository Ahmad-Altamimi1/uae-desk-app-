import TabsComponent from "@/components/Tabs";
import React from "react";
import CustomerFTAInformation from "./components/CustomerFTAInformation";
import { api } from "@/lib/api/serverCore";
import { ICustomerData } from "@/entities/dashboard";
import { getTranslations } from "next-intl/server";
import { StatusCell } from "@/components/table/statusCell";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
import ServicesAndPaymentDetails from "./components/ServicesAndPaymentDetails";

interface CustomerViewProps {
  params: Promise<{ customerId: string }>;
}
const CustomerView = async ({ params }: CustomerViewProps) => {
  const data = await api.get<ICustomerData>([
    "CustomerShow",
    (await params).customerId,
  ]);
  const serviceOptions = mapToSelectOptions(
    data.customer.services,
    (s) => s.name,
    (s) => s.id,
    (b) => ({ price: { value: b.price || 23 } })
  );
  const t = await getTranslations("dashboard.customers");
  return (
    <>
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[25px] font-bold text-gray-800">
            {data.customer.business_name}
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">{t("ApplicationID")}:</p>
            <span>{data.customer.invoice_number}</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground text-xs">{t("CurrentStatus")}</p>
          <StatusCell
            status={Number(data.customer.status)}
            className="mt-2 p-1 w-full text-xs"
          />
        </div>
      </div>
      <TabsComponent
        items={[
          {
            component: <CustomerFTAInformation customer={data?.customer} />,
            name: "dashboard.customers.tabs.CustomerFTAInformation",
          },
          {
            component: (
              <ServicesAndPaymentDetails
                customer={data?.customer}
                selectedServices={data.selectedServices}
                serviceOptions={serviceOptions}
              />
            ),
            name: "dashboard.customers.tabs.ServicesAndPaymentDetails",
          },
          {
            component: <div>UploadedMedia</div>,
            name: "dashboard.customers.tabs.UploadedMedia",
          },
          {
            component: <div>ProcessTimeTracking</div>,
            name: "dashboard.customers.tabs.ProcessTimeTracking",
          },
        ]}
      />
    </>
  );
};

export default CustomerView;
