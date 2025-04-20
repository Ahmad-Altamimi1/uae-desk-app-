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
import { RowCell } from "@/components/table/rowCell";
import { RolesService } from "@/lib/api/services/dashboard/roles";
// export const schema = z.object({
//   id: z.number(),
//   header: z.string(),
//   type: z.string(),
//   status: z.string(),
//   target: z.string(),
//   limit: z.string(),
//   reviewer: z.string(),
// });

export const columns: ColumnDef<IResponseUsersRoles>[] = [
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
    accessorKey: "name",
    header: () => <HeaderCell label="roles.name" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.name} />
      </div>
    ),
  },
  {
    accessorKey: "code",
    header: () => <HeaderCell label="roles.code" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.code} />
      </div>
    ),
  },

  {
    accessorKey: "actions",
    header: () => <HeaderCell label="roles.actions" />,
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <ActionCell
          id={row.original.id}
          name={row.original.name}
          editAction={() => handleEdit(row.original.id)}
          onDeleted={RolesService.destroy(row.original.id)}
        />
      </div>
    ),
  },
];
