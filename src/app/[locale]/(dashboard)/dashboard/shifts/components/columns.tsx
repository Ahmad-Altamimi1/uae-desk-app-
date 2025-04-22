"use client";

import { DragHandle } from "@/components/table/dragHandle";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";
import ActionCell from "@/components/table/actionCell";
import { HeaderCell } from "@/components/table/headerCell";
import { RowCell } from "@/components/table/rowCell";
import { IShiftsData } from "@/entities/dashboard/shifts";
import { StatusToggle } from "./statusToggle";
import { deleteShifts, handleUpdateStatus } from "../../../actions/shifts";
import { toast } from "sonner";
import ShiftAction from "./action";
import { useHasRole } from "@/hooks/hasRole";
import { RoleTypesOptions } from "@/constants";


export const columns: ColumnDef<IShiftsData>[] = [
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
    header: () => <HeaderCell label="shifts.name" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.name} />
      </div>
    ),
  },
  {
    accessorKey: "startTime",
    header: () => <HeaderCell label="shifts.startTime" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.start_time} />
      </div>
    ),
  },
  {
    accessorKey: "endTime",
    header: () => <HeaderCell label="shifts.endTime" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.end_time} />
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: () => <HeaderCell label="shifts.status" />,
    cell: ({ row }) => {
      const hasRole=useHasRole( )
      if(!(hasRole(RoleTypesOptions.admin) || hasRole(RoleTypesOptions["super-admin"]))){
return null
      }
      const { id, is_active } = row.original;
      return (
        <StatusToggle
          id={id}
          isActive={!!is_active}
          onChange={async (id, newValue) => {
            await handleUpdateStatus(id, newValue).then((res) => {
              if (res.success) {
                toast.success(res.message);
              } else {
                toast.error(res.error);
                throw new Error();
              }
            });
          }}
        />
      );
    },
  },

  
   {
    accessorKey: "actions",
    header: () => <HeaderCell label="shifts.actions" />,
    id: "actions",
    cell: ({ row }) => (
      <ShiftAction id={row.original.id} name={row.original.name} />
    ),
  },
];
