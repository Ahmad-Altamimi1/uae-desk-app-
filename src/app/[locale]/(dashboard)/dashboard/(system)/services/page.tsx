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
    <div>
      <ServiceCreateForm />
      <DataTable columns={columns} data={response} />;
    </div>

  );
};

export default Page;
