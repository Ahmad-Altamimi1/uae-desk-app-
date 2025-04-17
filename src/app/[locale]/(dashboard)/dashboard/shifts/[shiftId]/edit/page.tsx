import { IResponseSingleServices } from "@/entities/dashboard";
import { api } from "@/lib/api/serverCore";
import React from "react";
import { UpdateShiftForm } from "./components/updateShiftForm";
import { IResponseShifts } from "@/entities/dashboard/shifts";

interface IUpdateShiftProps {
    params: Promise<{ shiftId: string }>;
}
const updateShiftPage = async ({ params }: IUpdateShiftProps) => {
    const shiftId = (await params).shiftId;
    const shift = await api.get<IResponseShifts>([
    "ShiftsEdit",
    shiftId,
  ]);

  return <UpdateShiftForm shift={shift.data} />;
};

export default updateShiftPage;
