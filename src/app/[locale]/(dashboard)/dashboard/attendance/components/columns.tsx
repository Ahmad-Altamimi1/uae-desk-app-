"use client";

import { DragHandle } from "@/components/table/dragHandle";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@radix-ui/react-checkbox";

//TODO
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { z } from "zod";
import { TableCellViewer } from "@/components/table/TableCellViewer";
import ActionCell from "@/components/table/actionCell";
import { IResponseUsersRoles } from "@/entities/dashboard/users";
import { HeaderCell } from "@/components/table/headerCell";
import { StatusCell } from "@/components/table/statusCell";
import {
  IResponseBranches,
  IResponseServices,
  IResponseUsersPermissions,
} from "@/entities/dashboard";
import { RowCell } from "@/components/table/rowCell";
import { IResponseShifts } from "@/entities/dashboard/shifts";
import { Switch } from "@radix-ui/react-switch";
import { StatusToggle } from "./statusToggle";
import { IResponseAttendance } from "@/entities/dashboard/attendance";
// export const schema = z.object({
//   id: z.number(),
//   header: z.string(),
//   type: z.string(),
//   status: z.string(),
//   target: z.string(),
//   limit: z.string(),
//   reviewer: z.string(),
// });

export const columns: ColumnDef<IResponseAttendance>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "header",
    header: () => <HeaderCell label="SL" />,

    cell: ({ row }) => (
      <div>
        <RowCell label={String(row.index + 1)} />
      </div>
    ),
  },

  {
    accessorKey: "user_name",
    header: () => <HeaderCell label="attendance.user_name" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.user.name} />
      </div>
    ),
  },
  {
    accessorKey: "login",
    header: () => <HeaderCell label="attendance.login" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.login_time} />
      </div>
    ),
  },

  {
    accessorKey: "logout",
    header: () => <HeaderCell label="attendance.logout" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.logout_time} />
      </div>
    ),
  },
  {
    accessorKey: "branchName",
    header: () => <HeaderCell label="attendance.branchName" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.branch?.branch_name} />
      </div>
    ),
  },
  {
    accessorKey: "is_late",
    header: () => <HeaderCell label="attendance.is_late" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.is_late ? "Yes" : "No"} />
      </div>
    ),
  },

  {
    accessorKey: "is_minutes",
    header: () => <HeaderCell label="attendance.is_minutes" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.is_minutes} />
      </div>
    ),
  },
  // {
  //   accessorKey: "actions",
  //   header: ()=> <HeaderCell label="attendance.actions" />,
  //   id: "actions",
  //   cell: ({ row }) => (
  //     <div className="flex items-center justify-center">
  //       <ActionCell
  //         id={row.original.id}
  //         name={row.original.name}
  //         editAction={() => handleEdit(row.original.id)}
  //         onDeleted={Atte.destroy(row.original.id)}
  //       />
  //     </div>
  //   )

  // },
];
