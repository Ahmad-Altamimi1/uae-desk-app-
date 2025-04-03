import { DataTable } from "@/components/table/dataTable";
import React from "react";
import { columns } from "./components/columns";
import data from "../data.json";

const Page = () => {
  return <DataTable columns={columns} data={data} />;
};

export default Page;
