import { DataTable } from "@/components/table/dataTable";
import React from "react";
import { columns } from "./components/columns";
import { api } from "@/lib/api/serverCore";
import ToolBar2 from "@/components/table/toolBar2";
import { IResponseBranches } from "@/entities/dashboard";

const Page = async () => {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: IResponseBranches[];
  }>("getBranches");

  const branches = response?.data ?? [];

  return (
    <>
      <ToolBar2
        title="dashboard.branches.title"
        description="dashboard.branches.description"
        image="/customer.png"
        addButton={{
            title: "dashboard.branches.Add",
            href: "branches/create",
          }}
      />
      <DataTable columns={columns} data={branches} />
    </>
  );
};

export default Page;
