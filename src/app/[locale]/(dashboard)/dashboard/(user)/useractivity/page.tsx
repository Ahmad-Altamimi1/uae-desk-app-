import { DataTable } from "@/components/table/dataTable";
import React from "react";
import { columns } from "./components/columns";
import { api } from "@/lib/api/serverCore";
import ToolBar2 from "@/components/table/toolBar2";
import { IRequestUsersPermissions } from "@/entities/dashboard";

const Page = async () => {
  const data = await api.get<IRequestUsersPermissions[]>("getPermissions");
  return (
    <>
      <ToolBar2
        title="dashboard.permissions.title"
        description="dashboard.permissions.description"
        image="/customer.png"
        addButton={{
          title: "",
          href: "",
        }}
      />
      <DataTable columns={columns} data={data} />;
    </>
  );
};

export default Page;
