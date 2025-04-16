"use client";

import { DragHandle } from "@/components/table/dragHandle";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";
import ActionCell from "@/components/table/actionCell";
import { HeaderCell } from "@/components/table/headerCell";
import { IServicesData } from "@/entities/dashboard";
import { RowCell } from "@/components/table/rowCell";
import { deleteServices } from "@/app/[locale]/(dashboard)/actions/services";
import { toast } from "sonner";

export const columns: ColumnDef<IServicesData>[] = [
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
    header: <HeaderCell label="services.name" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.name} />
      </div>
    ),
  },

  {
    accessorKey: "actions",
    header: <HeaderCell label="services.actions" />,
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <ActionCell
          id={row.original.id}
          name={row.original.name}
          editAction={() => handleEdit(row.original.id)}
          onDeleted={async () =>
            await deleteServices(row.original.id).then((r) => {
              if (r.error) {
                throw new Error("Error in delete");
              }
            })
          }
        />
      </div>
    ),
  },
];
