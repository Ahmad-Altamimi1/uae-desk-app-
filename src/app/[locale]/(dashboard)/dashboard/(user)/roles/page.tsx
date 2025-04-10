import { DataTable } from "@/components/table/dataTable";
import React from "react";
import { columns } from "./components/columns";
// import data from "../data.json";
import { api } from "@/lib/api/serverCore";
import { cookies } from "next/headers";
import ToolBarModal from "@/components/table/toolBarModal";
import PermissionCreateForm from "../permissions/create/page";
import RoleCreateForm from "./create/page";

const Page = async () => {
  // const data = await routes.customers.getAll();
  const data = await api.get("getRoles");
  return <>
    <ToolBarModal
      title="dashboard.roles.title"
      description="dashboard.roles.description"
      image="/customer.png"
      addButton={{
        title: "dashboard.roles.Add",
        // href: "permissions/create",
      }}
    >

      <RoleCreateForm />
    </ToolBarModal>



    <DataTable columns={columns} data={data} />;
  </>

};

export default Page;
