import { DataTable } from "@/components/table/dataTable";
import React from "react";
import { columns } from "./components/columns";
import { api } from "@/lib/api/serverCore";
import PermissionCreateForm from "./create/page";
import { IResponseUsersPermissions } from "@/entities/dashboard";

const Page = async () => {
  const data = await api.get<IResponseUsersPermissions[]>("getPermissions");
  return (
    <div>
      <PermissionCreateForm />
      <DataTable columns={columns} data={data} />;
    </div>
  );
};

export default Page;
