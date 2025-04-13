import { IResponseCustomer } from "@/entities/dashboard";
import { api } from "@/lib/api/serverCore";
import React from "react";
import { CustomerForm } from "./components/createCustomerForm";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";

const Page = async () => {
  const services = await api.get<IResponseCustomer[]>("getServices"); //TODO
  const branches = await api.get<IResponseCustomer[]>("getBranches"); //TODO
  const branchOptions = mapToSelectOptions(
    branches,
    (b) => b.branch_name,
    (b) => b.id
  );

  const serviceOptions = mapToSelectOptions(
    services,
    (s) => s.name,
    (s) => s.id,
    (b) => ({ price: { value: b.price || 23 } })
  );

  return (
    <CustomerForm
      serviceOptions={serviceOptions}
      branchOptions={branchOptions}
    />
  );
};

export default Page;
