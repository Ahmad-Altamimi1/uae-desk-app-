import { DataTable } from "@/components/table/dataTable";
import React from "react";
import { columns } from "./components/columns";
import { api } from "@/lib/api/serverCore";
import ToolBarModal from "@/components/table/toolBarModal";
import { IRequestServices } from "@/entities/dashboard";

const Page = async () => {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: IRequestServices[];
  }>("getServices");

  const data = response?.data ?? [];

  return (
    <>
      <ToolBarModal
        title="dashboard.services.title"
        description="dashboard.services.description"
        image="/customer.png"
        addButton={{
          title: "dashboard.services.Add",
          href: "permissions/create",
        }}
      />
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default Page;
