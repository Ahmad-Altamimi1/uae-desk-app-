import {
  IGetCustomer,
  IResponseBranches,
  IResponseServices,
} from "@/entities/dashboard";
import { api } from "@/lib/api/serverCore";
import React from "react";
import { UpdateServiceForm } from "./components/updateServiceForm";

interface IUpdateServiceProps {
  params: Promise<{ serviceId: string }>;
}
const updateService = async ({ params }: IUpdateServiceProps) => {
  const serviceId = (await params).serviceId;
  console.log("serviceIdserviceIdserviceId",serviceId);
  

  const service = await api.get<IResponseServices>("ServicesEdit");

  return (
    <UpdateServiceForm
     
      data={service.data}
    />
  );
};

export default updateService;
