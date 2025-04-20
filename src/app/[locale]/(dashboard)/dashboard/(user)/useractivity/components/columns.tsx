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
import {
  IconCircleCheckFilled,
  IconEye,
  IconLoader,
} from "@tabler/icons-react";
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
import { IResponseLogs, IResponseUsersPermissions } from "@/entities/dashboard";
import { RowCell } from "@/components/table/rowCell";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/button";
// export const schema = z.object({
//   id: z.number(),
//   header: z.string(),
//   type: z.string(),
//   status: z.string(),
//   target: z.string(),
//   limit: z.string(),
//   reviewer: z.string(),
// });
const handleClick = (action: string) => {
  console.log(`${action} clicked`);
};
export const columns: ColumnDef<IResponseLogs>[] = [
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

  // {
  //   accessorKey: "header",
  //   header: ()=> <HeaderCell label="SL" />,

  //   cell: ({ row }) => (
  //     <div>
  //       <RowCell label={String(row.index + 1)} />
  //     </div>
  //   ),
  // },

  {
    accessorKey: "ID",
    header: () => <HeaderCell label="userActivity.id" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.id} />
      </div>
    ),
  },

  {
    accessorKey: "logdate",
    header: () => <HeaderCell label="userActivity.logdate" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.log_date} />
      </div>
    ),
  },

  {
    accessorKey: "logtype",
    header: () => <HeaderCell label="userActivity.logtype" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.log_type} />
      </div>
    ),
  },

  {
    accessorKey: "user_name",
    header: () => <HeaderCell label="userActivity.userId" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.user_name} />
      </div>
    ),
  },

  // {
  //   accessorKey: "actions",
  //   header: ()=> <HeaderCell label="userActivity.actions" />,
  //   id: "actions",
  //   cell: () => (
  //     <div className="p-3 flex items-center justify-center">
  //       <TooltipProvider>
  //         <Tooltip>
  //           <TooltipTrigger>
  //             <Button
  //               size="sm"
  //               variant="link"
  //               className="bg-gray-200 rounded-3xl flex items-center gap-2 cursor-pointer"
  //               aria-label="View Customer"
  //               onClick={() => handleClick("View Customer")}
  //             >
  //               <IconEye className="text-black" />
  //             </Button>
  //           </TooltipTrigger>
  //           <TooltipContent className="text-black">
  //             <p>View Customer</p>
  //           </TooltipContent>
  //         </Tooltip>
  //       </TooltipProvider>      </div>
  //   )

  // },
];
