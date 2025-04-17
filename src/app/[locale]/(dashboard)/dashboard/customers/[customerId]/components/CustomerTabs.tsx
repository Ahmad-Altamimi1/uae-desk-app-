"use client";
import TabsComponent from "@/components/Tabs";
import React, { useState } from "react";
import CustomerFTAInformation from "./tabs/CustomerFTAInformation";
import { ICustomerData } from "@/entities/dashboard";
import { StatusCell } from "@/components/table/statusCell";
import ServicesAndPaymentDetails from "./tabs/ServicesAndPaymentDetails";
import UploadedMedia from "./tabs/UploadedMedia";
import { ISelectOption } from "@/utils/type";
import { useTranslations } from "next-intl";

import UploadMediaFromModal from "./UploadMediaFromModal";
import ProcessTimeTracking from "./tabs/ProcessTimeTracking";
import ExpertActions from "./tabs/ExpertActions";
import FtaDocument from "./tabs/fatDocument";

interface CustomerTabsProps {
  data: ICustomerData;
  serviceOptions: ISelectOption[];
  allServiceOptions: ISelectOption[];
}

const CustomerTabs = ({
  data,
  serviceOptions,
  allServiceOptions,
}: CustomerTabsProps) => {
  const t = useTranslations("dashboard.customers");
  const [activeHeader, setActiveHeader] = useState(0);
  const defaultContent = () => {
    return (
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
    );
  };
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
    defaultContent,
    defaultContent,
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

    defaultContent,
    defaultContent,
  ];

  return (
    <>
      <div className="mb-4">{headerContents[activeHeader]?.()}</div>

      <TabsComponent
        setActiveHeader={setActiveHeader}
        items={[
          {
            component: <CustomerFTAInformation customer={data.customer} />,
            name: "dashboard.customers.tabs.CustomerFTAInformation",
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
            component: (
              <ExpertActions
                customer={data.customer}
                selectedServices={data.selectedServices}
                serviceOptions={allServiceOptions}
              />
            ),
            name: "dashboard.customers.tabs.ExpertActions",
          },
          {
            component: (
              <UploadedMedia
                media={data.customer.media}
                customer={data.customer}
              />
            ),
            name: "dashboard.customers.tabs.UploadedMedia",
          },

          {
            component: (
              <FtaDocument
                ftaDocument={data.customer.ftamedia}
                customer={data.customer}
              />
            ),
            name: "dashboard.customers.tabs.fat",
          },
          {
            component: (
              <ProcessTimeTracking processTime={data.processTime.original} />
            ),
            name: "dashboard.customers.tabs.ProcessTimeTracking",
          },
        ]}
      />
    </>
  );
};

export { CustomerTabs };
