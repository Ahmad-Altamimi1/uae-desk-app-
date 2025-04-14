import { DataTable } from "@/components/table/dataTable";
import React from "react";
import { columns } from "./components/columns";
import { api } from "@/lib/api/serverCore";
import ToolBar2 from "@/components/table/toolBar2";
import { IResponseBranches } from "@/entities/dashboard";
import { IResponseShifts } from "@/entities/dashboard/shifts";

const Page = async () => {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: IResponseShifts[];
  }>("getShifts");

  const shifts = response?.data ?? [];

  return (
    <>
      <ToolBar2
        title="dashboard.shifts.title"
        description="dashboard.shifts.description"
        image="/customer.png"
        addButton={{
            title: "dashboard.shifts.Add",
            href: "shifts/create",
          }}
      />
      <DataTable columns={columns} data={shifts} />
    </>
  );
};

export default Page;
