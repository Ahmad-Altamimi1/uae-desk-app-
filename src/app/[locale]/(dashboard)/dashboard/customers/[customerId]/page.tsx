import React from "react";
import { api } from "@/lib/api/serverCore";
import { ICustomerData, IResponseServices } from "@/entities/dashboard";
import { getTranslations } from "next-intl/server";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
import { CustomerTabs } from "./components/CustomerTabs";

interface CustomerViewProps {
  params: Promise<{ customerId: string }>;
}
const CustomerView = async ({ params }: CustomerViewProps) => {
  const data = await api.get<ICustomerData>([
    "CustomerShow",
    (await params).customerId,
  ]);
  const services = await api
    .get<IResponseServices>("getServices")
    .then((r) => r.data); //TODO

  const serviceOptions = mapToSelectOptions(
    data.customer.services,
    (s) => s.name,
    (s) => s.id,
    (b) => ({ price: { value: b.price || 23 } })
  );
  const allServiceOptions = mapToSelectOptions(
    services,
    (s) => s.name,
    (s) => s.id,
    (b) => ({ price: { value: b.price || 23 } })
  );
  const t = await getTranslations("dashboard.customers");
  return <CustomerTabs data={data} serviceOptions={serviceOptions} allServiceOptions={allServiceOptions} />;
};

export default CustomerView;
