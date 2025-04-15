"use client";
import TabsComponent from "@/components/Tabs";
import React, { useState } from "react";
import CustomerFTAInformation from "./CustomerFTAInformation";
import { ICustomerData } from "@/entities/dashboard";
import { StatusCell } from "@/components/table/statusCell";
import ServicesAndPaymentDetails from "./ServicesAndPaymentDetails";
import UploadedMedia from "./UploadedMedia";
import { ISelectOption } from "@/utils/type";
import { useTranslations } from "next-intl";

import UploadMediaFromModal from "./UploadMediaFromModal";

interface CustomerTabsProps {
  data: ICustomerData;
  serviceOptions: ISelectOption[];
}

const CustomerTabs = ({ data, serviceOptions }: CustomerTabsProps) => {
  const t = useTranslations("dashboard.customers");
  const [activeHeader, setActiveHeader] = useState(0);

  // Custom headers for each tab
  const headerContents = [
    () => (
      <div>
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
            <p className="text-muted-foreground text-xs">
              {t("CurrentStatus")}
            </p>
            <StatusCell
              status={Number(data.customer.status)}
              className="mt-2 p-1 w-full text-xs"
            />
          </div>
        </div>
      </div>
    ),
    () => (
      <div className="flex items-center ">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[25px] font-bold text-gray-800">
            {data.customer.business_name}
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">{t("ApplicationID")}:</p>
            <span>{data.customer.invoice_number}</span>
          </div>
        </div>
      </div>
    ),
    () => (
      <div className="flex items-center justify-between ">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[25px] font-bold text-gray-800">
            {data.customer.business_name}
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">{t("ApplicationID")}:</p>
            <span>{data.customer.invoice_number}</span>
          </div>
        </div>
        <div>
          <UploadMediaFromModal customerId={data.customer.id} />
        </div>
      </div>
    ),
    () => (
      <div className="flex items-center justify-between ">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[25px] font-bold text-gray-800">
            {data.customer.business_name}
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">{t("ApplicationID")}:</p>
            <span>{data.customer.invoice_number}</span>
          </div>
        </div>
      </div>
    ),
  ];

  return (
    <>
      <div className="mb-4">{headerContents[activeHeader]()}</div>

      <TabsComponent
        setActiveHeader={setActiveHeader}
        items={[
          {
            component: <CustomerFTAInformation customer={data.customer} />,
            name: "dashboard.customers.tabs.CustomerFTAInformation",
            tag: "CustomerAndFTAInformation",
          },
          {
            component: (
              <ServicesAndPaymentDetails
                customer={data.customer}
                selectedServices={data.selectedServices}
                serviceOptions={serviceOptions}
              />
            ),
            name: "dashboard.customers.tabs.ServicesAndPaymentDetails",
          },
          {
            component: <UploadedMedia media={data.customer.media} />,
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

export { CustomerTabs };
