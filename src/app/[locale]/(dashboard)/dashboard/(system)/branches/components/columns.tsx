"use client";

import { DragHandle } from "@/components/table/dragHandle";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@radix-ui/react-checkbox";

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
  IBranchesData,
  IResponseBranches,
  IResponseServices,
  IResponseUsersPermissions,
} from "@/entities/dashboard";
import { RowCell } from "@/components/table/rowCell";
import { BranchesService } from "@/lib/api/services/dashboard/branches";
import { deleteBranches } from "@/app/[locale]/(dashboard)/actions/branches";

export const columns: ColumnDef<IBranchesData>[] = [
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
    header: () => <HeaderCell label="branches.name" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.branch_name} />
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: () => <HeaderCell label="branches.location" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.location_id} />
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: () => <HeaderCell label="branches.address" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.address} />
      </div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: () => <HeaderCell label="branches.phoneNumber" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.phone_number} />
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <HeaderCell label="branches.email" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.email} />
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: () => <HeaderCell label="branches.actions" />,
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <ActionCell
          id={row.original.id}
          name={row.original.branch_name}
          editAction={() => handleEdit(row.original.id)}
          onDeleted={async () => await deleteBranches(row.original.id)}
        />
      </div>
    ),
  },
];
