import { DataTable } from "@/components/table/dataTable";
import React from "react";
import { columns } from "./components/columns";
// import data from "../data.json";
import { api } from "@/lib/api/serverCore";
import { cookies } from "next/headers";

const Page = async () => {
  // const data = await routes.customers.getAll();
  const cookieStore = await cookies();
  console.log("====================================");
  console.log("cookieStore", cookieStore.getAll());
  console.log("====================================");
  const data = await api.get("getCustomers");
  console.log("====================================");
  console.log("data", data);
  console.log("====================================");
  return <DataTable columns={columns} data={data} />;
};

export default Page;
