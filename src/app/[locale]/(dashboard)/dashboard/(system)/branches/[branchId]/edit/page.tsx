import { ILocation, IResponseBranches, IResponseSingleBranche, IResponseSingleServices } from "@/entities/dashboard";
import { api } from "@/lib/api/serverCore";
import React from "react";
import { UpdateBranchForm } from "./components/updateBranchForm";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";

interface IUpdateBranchProps {
  params: Promise<{ branchId: string }>;
}
const updateBranchPage = async ({ params }: IUpdateBranchProps) => {
  const branchId = (await params).branchId;
  const branch = await api.get<IResponseSingleBranche>([
    "BranchesEdit",
    branchId,
  ]);
  const locations = await api.get<{
    success: boolean;
    message: string;
    data: ILocation[];
  }>(
    "getLocations",
  );

  const locationOptions = mapToSelectOptions(locations.data, (e) => e.name, (e) => e.id)
  // const locationOptions = mapToSelectOptions(locations.data, (e) => e.name, (e) => e.id)


  return <UpdateBranchForm branch={branch.data} locations={locationOptions} />;
};

export default updateBranchPage;
