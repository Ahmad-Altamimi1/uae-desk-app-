import { DataTable } from "@/components/table/dataTable";
import React from "react";
import { columns } from "./components/columns";
// import data from "../data.json";
import { api } from "@/lib/api/serverCore";
import { IResponseCustomer } from "@/entities/dashboard";
import CreateButton from "@/components/table/createButton";

const Page = async () => {
  const data = await api.get<IResponseCustomer[]>("getCustomers");

  return (
    <>
      <CreateButton title={"ADD"} href="customers/create" />
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default Page;
