import { DataTable } from "@/components/table/dataTable";
import React from "react";
import { columns } from "./components/columns";
// import data from "../data.json";

import { api } from "@/lib/api/serverCore";
import { IResponseCustomer } from "@/entities/dashboard";
import ToolBar2 from "@/components/table/toolBar2";

const Page = async () => {
  const data = await api.get<IResponseCustomer[]>("getCustomers");

  return (
    <>
      <ToolBar2
        title="dashboard.customers.title"
        description="dashboard.customers.description"
        image="/customer.png"
        addButton={{
          title: "dashboard.customers.AddNewCustomer",
          href: "customers/create",
        }}
      />

      <DataTable columns={columns} data={data} />
    </>
  );
};

export default Page;
