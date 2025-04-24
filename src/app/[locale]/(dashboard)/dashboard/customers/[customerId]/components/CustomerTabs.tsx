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
import { useHasPermission } from "@/hooks/useHasPermission";
import { useHasRole } from "@/hooks/hasRole";
import { PermissionTypesOptions, RoleTypesOptions } from "@/constants";

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
  const hasPermission=useHasPermission()
  const hasRole=useHasRole()
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
    hasPermission(PermissionTypesOptions["customers-view"]) && (() => (
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
    )),
    hasPermission(PermissionTypesOptions["customers-view"]) && defaultContent,
    hasPermission(PermissionTypesOptions["customers-view"]) && defaultContent,
   ( hasPermission(PermissionTypesOptions["customers-view"]) &&hasPermission(PermissionTypesOptions["customers-upload-media"]) )&&
      (() => (
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
    )),

    defaultContent,
    defaultContent,
  ];
const items = [
  hasPermission(PermissionTypesOptions["customers-view"]) && {
    component: <CustomerFTAInformation customer={data.customer} />,
    name: "dashboard.customers.tabs.CustomerFTAInformation",
  },
 ( hasPermission(PermissionTypesOptions["customers-view"]) )&& {
    component: (
      <ServicesAndPaymentDetails
        customer={data.customer}
        selectedServices={data.selectedServices}
        serviceOptions={serviceOptions}
      />
    ),
    name: "dashboard.customers.tabs.ServicesAndPaymentDetails",
  },
(  hasPermission(PermissionTypesOptions["customers-view"]) || (hasRole(RoleTypesOptions.expert)||hasRole(RoleTypesOptions["super-admin"])))&&{
    component: (
      <ExpertActions
        customer={data.customer}
        selectedServices={data.selectedServices}
        serviceOptions={allServiceOptions}
      />
    ),
    name: "dashboard.customers.tabs.ExpertActions",
  },
 ( hasPermission(PermissionTypesOptions["customers-view"]) &&PermissionTypesOptions["customers-upload-media"])&& {
    component: (
      <UploadedMedia
        media={data.customer.media}
        customer={data.customer}
      />
    ),
    name: "dashboard.customers.tabs.UploadedMedia",
  },
  (hasPermission(PermissionTypesOptions["customers-view"]) &&  hasRole(RoleTypesOptions.supervisor)||hasRole(RoleTypesOptions["super-admin"]))&& {
    component: (
      <FtaDocument
        ftaDocument={data.customer.ftamedia}
        customer={data.customer}
      />
    ),
    name: "dashboard.customers.tabs.fat",
  },
 ( hasPermission(PermissionTypesOptions["customers-view"]) ||( hasRole(RoleTypesOptions["super-admin"])||hasRole(RoleTypesOptions["super-admin"])))&& {
    component: (
      <ProcessTimeTracking processTime={data.processTime.original} />
    ),
    name: "dashboard.customers.tabs.ProcessTimeTracking",
  },
].filter(Boolean);
  return (
    <>
      <div className="mb-4">{headerContents[activeHeader]?.()}</div>

      <TabsComponent
        setActiveHeader={setActiveHeader}
        items={items}
      />
    </>
  );
};

export { CustomerTabs };
