import { IResponseSingleServices } from "@/entities/dashboard";
import { api } from "@/lib/api/serverCore";
import React from "react";
import { UpdateServiceForm } from "./components/updateServiceForm";

interface IUpdateServiceProps {
  params: Promise<{ serviceId: string }>;
}
const updateServicePage = async ({ params }: IUpdateServiceProps) => {
  const serviceId = (await params).serviceId;
  const service = await api.get<IResponseSingleServices>([
    "ServicesEdit",
    serviceId,
  ]);

  return <UpdateServiceForm service={service.data} />;
};

export default updateServicePage;
