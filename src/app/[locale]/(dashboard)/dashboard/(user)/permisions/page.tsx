import { DataTable } from "@/components/table/dataTable";
import React from "react";
import { columns } from "./components/columns";
// import data from "../data.json";
import { api } from "@/lib/api/serverCore";
import { cookies } from "next/headers";

const Page = async () => {
  // const data = await routes.customers.getAll();
  const data = await api.get("getPermissions");
  return <DataTable columns={columns} data={data} />;
};

export default Page;
