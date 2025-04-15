import { DataTable } from "@/components/table/dataTable";
import React from "react";
import { columns } from "./components/columns";
import { api } from "@/lib/api/serverCore";
import ToolBarModal from "@/components/table/toolBarModal";
import { IResponseServices } from "@/entities/dashboard";
import ServiceCreateForm from "./create/page";

const Page = async () => {
  const response = await api
    .get<IResponseServices>("getServices")
    .then((r) => r.data);

  return (
    <>
    <ToolBarModal
      title="dashboard.services.title"
      description="dashboard.services.description"
      image="/customer.png"
      addButton={{
        title: "dashboard.services.Add",
        // href: "services/create",
      }}
    >

      <ServiceCreateForm />
    </ToolBarModal>


    <DataTable columns={columns} data={response} />;
  </>

  );
};

export default Page;
