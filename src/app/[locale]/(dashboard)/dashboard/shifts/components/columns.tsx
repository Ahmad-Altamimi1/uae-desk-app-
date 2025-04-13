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
import { IResponseUsersRoles } from '@/entities/dashboard/users'
import { HeaderCell } from "@/components/table/headerCell";
import { StatusCell } from "@/components/table/statusCell";
import { IResponseBranches, IResponseServices, IResponseUsersPermissions } from "@/entities/dashboard";
import { RowCell } from "@/components/table/rowCell";
import { IResponseShifts } from "@/entities/dashboard/shifts";
import { Switch } from "@radix-ui/react-switch";
import { StatusToggle } from "./statusToggle";
// export const schema = z.object({
//   id: z.number(),
//   header: z.string(),
//   type: z.string(),
//   status: z.string(),
//   target: z.string(),
//   limit: z.string(),
//   reviewer: z.string(),
// });

export const columns: ColumnDef<IResponseShifts>[] = [
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
    header: <HeaderCell label="SL" />,

    cell: ({ row }) => (
      <div>
        <RowCell label={row.index + 1} />
      </div>
    ),
  },



  {


    accessorKey: "name",
    header: <HeaderCell label="shifts.name" />,
    cell: ({ row }) => (

      <div>
        <RowCell label={row.original.name} />
      </div>


    ),
  },
  {


    accessorKey: "startTime",
    header: <HeaderCell label="shifts.startTime" />,
    cell: ({ row }) => (

      <div>
        <RowCell label={row.original.start_time} />
      </div>


    ),
  },  {


    accessorKey: "endTime",
    header: <HeaderCell label="shifts.endTime" />,
    cell: ({ row }) => (

      <div>
        <RowCell label={row.original.end_time} />
      </div>


    ),
  },

  {
    accessorKey: "status",
    header: <HeaderCell label="shifts.status" />,
    cell: ({ row }) => {
      const { id, is_active } = row.original;
      return (
        <StatusToggle
          id={id}
          isActive={is_active}
          onChange={(id, newValue) => {
            console.log("New status for", id, newValue);
          }}
        />
      );
    },
  },
  
  {
    accessorKey: "actions",
    header: <HeaderCell label="shifts.actions" />,
    id: "actions",
    cell: () => (
      <div className="flex items-center justify-center">
        <ActionCell />
      </div>
    )
    
  },

];
