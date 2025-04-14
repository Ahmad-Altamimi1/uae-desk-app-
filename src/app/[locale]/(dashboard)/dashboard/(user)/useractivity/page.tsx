import { DataTable } from "@/components/table/dataTable";
import React from "react";
import { columns } from "./components/columns";
import { api } from "@/lib/api/serverCore";
import ToolBar2 from "@/components/table/toolBar2";
import { IRequestLogs, IRequestUsersPermissions } from "@/entities/dashboard";
import { log } from "console";

const Page = async () => {
  const data = await api.get<IRequestLogs[]>("getLogs");
  log("data from apiww",data, "data from api");
  return (
    <>
      <ToolBar2
        title="dashboard.userActivity.title"
        description="dashboard.userActivity.description"
        image="/customer.png"
        // addButton={{
        //   title: "",
        //   href: "",
        // }}
      />
      <DataTable columns={columns} data={data.logs} />;
    </>
  );
};

export default Page;
