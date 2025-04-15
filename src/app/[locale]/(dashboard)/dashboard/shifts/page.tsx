import { DataTable } from "@/components/table/dataTable";
import React from "react";
import { columns } from "./components/columns";
import { api } from "@/lib/api/serverCore";
import ToolBar2 from "@/components/table/toolBar2";
import { IResponseBranches } from "@/entities/dashboard";
import { IResponseShifts } from "@/entities/dashboard/shifts";
import ToolBarModal from "@/components/table/toolBarModal";
import ShiftsCreateForm from "./create/page";

const Page = async () => {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: IResponseShifts[];
  }>("getShifts");

  const shifts = response?.data ?? [];

  return (
    <div>
      <ShiftsCreateForm />
      <DataTable columns={columns} data={shifts} />

    </div>


  );
};

export default Page;
