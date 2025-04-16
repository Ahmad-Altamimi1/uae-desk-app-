import { DataTable } from "@/components/table/dataTable";
import React from "react";
import { columns } from "./components/columns";
import { api } from "@/lib/api/serverCore";
import { IResponseShifts } from "@/entities/dashboard/shifts";
import ShiftsCreateForm from "./create/page";

const Page = async () => {
  const response = await api.get<IResponseShifts>("getShifts");

  const shifts = response?.data ?? [];

  return (
    <div>
      <ShiftsCreateForm />
      <DataTable columns={columns} data={shifts} />
    </div>
  );
};

export default Page;
