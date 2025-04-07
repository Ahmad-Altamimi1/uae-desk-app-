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
import { IResponseCustomer } from "@/entities/dashboard";
import { HeaderCell } from "@/components/table/headerCell";
import { StatusCell } from "@/components/table/statusCell";
// export const schema = z.object({
//   id: z.number(),
//   header: z.string(),
//   type: z.string(),
//   status: z.string(),
//   target: z.string(),
//   limit: z.string(),
//   reviewer: z.string(),
// });

export const columns: ColumnDef<IResponseCustomer>[] = [
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
    header: "SL",
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />;
    },
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: "Application ID",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.id}
        </Badge>
      </div>
    ),
  },
  {
    // accessorKey: 'business_name',

    // header: <HeaderCell lable="customers.businessName" />,

    accessorKey: "business_name",
    header: <HeaderCell label="customers.businessName" />,
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.business_name}
        </Badge>
      </div>
    ),
  },

  {
    accessorKey: "phone_number",
    header: <HeaderCell label="customers.phoneNumber" />,
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.phone_number}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "email",
    // header: "Email",
    header: <HeaderCell label="customers.email" />,
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.email}
        </Badge>
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: <HeaderCell label="customers.status" />,
    cell: ({ row }) => <StatusCell status={row.original.status} />,
  },

  {
    accessorKey: "actions",
    header: <HeaderCell label="customers.actions" />,
    id: "actions",
    cell: () => <ActionCell />,
  },
];
