import { DataTable } from "@/components/table/dataTable";
import React from "react";
import { columns } from "./components/columns";
import { api } from "@/lib/api/serverCore";
import { ILocation, IResponseBranches } from "@/entities/dashboard";
import BranchesCreateForm from "./create/page";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";

const Page = async () => {
  const response = await api.get<IResponseBranches>("getBranches");
  const branches = response?.data ?? [];

  // const locationsResponse = await api.get<{
  //   success: boolean;
  //   message: string;
  //   data: ILocation[];
  // }>("getLocations");

  // const locations = mapToSelectOptions(
  //   locationsResponse.data,
  //   (e) => e.name,
  //   (e) => e.id
  // );

  return (
    <div>
      <BranchesCreateForm locations={[]} />
      <DataTable columns={columns} data={branches} />
    </div>
  );
};

export default Page;
