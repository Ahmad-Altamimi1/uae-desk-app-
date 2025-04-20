"use client";

import { DragHandle } from "@/components/table/dragHandle";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { HeaderCell } from "@/components/table/headerCell";
import { IBranchesData } from "@/entities/dashboard";
import { RowCell } from "@/components/table/rowCell";
import BranchAction from "./action";

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
      <BranchAction id={row.original.id} name={row.original.branch_name} />
    ),
  },
];
