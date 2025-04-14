import { DataTable } from "@/components/table/dataTable";
import React from "react";
import { columns } from "./components/columns";
import { api } from "@/lib/api/serverCore";
import ToolBar2 from "@/components/table/toolBar2";

import { IResponseAttendance } from "@/entities/dashboard/attendance";

const Page = async () => {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: IResponseAttendance[];
  }>("getAttendance");

  const attendances = response?.data ?? [];

  return (
    <>
      <ToolBar2
        title="dashboard.attendance.title"
        description="dashboard.attendance.description"
        image="/customer.png"
        // addButton={{
        //     title: "dashboard.attendance.Add",
        //     href: "attendance/create",
        //   }}
      />
      <DataTable columns={columns} data={attendances} />
    </>
  );
};

export default Page;
