import {
  IGetCustomer,
  IResponseBranches,
  IResponseCustomer,
  IResponseServices,
} from "@/entities/dashboard";
import { api } from "@/lib/api/serverCore";
import React from "react";
import { UpdateCustomerForm } from "./components/updateCustomerForm";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
interface IUpdateCustomerProps {
  params: Promise<{ customerId: string }>;
}
const UpdateCustomer = async ({ params }: IUpdateCustomerProps) => {
  const customerId = (await params).customerId;
  const services = await api
    .get<IResponseServices>("getServices")
    .then((r) => r.data); //TODO
  const branches = await api
    .get<IResponseBranches>("getBranches")
    .then((r) => r.data); //TODO

  const customer = await api.get<IGetCustomer>(["CustomerEdit", customerId]);

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
    <UpdateCustomerForm
      serviceOptions={serviceOptions}
      branchOptions={branchOptions}
      data={customer.data}
    />
  );
};

export default UpdateCustomer;
