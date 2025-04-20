"use client";
import { DragHandle } from "@/components/table/dragHandle";
import { ColumnDef } from "@tanstack/react-table";
import { IResponseCustomer } from "@/entities/dashboard";
import { HeaderCell } from "@/components/table/headerCell";
import { StatusCell } from "@/components/table/statusCell";
import ActionCustomerCell from "./actionCustomer";
import { RowCell } from "@/components/table/rowCell";
import { CustomerServices } from "./customerServices";
import { Checkbox } from "@/components/ui/checkbox";

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

  // {
  //   accessorKey: "header",
  //   header: ()=> <HeaderCell label="SL" />,

  //   cell: ({ row }) => {

  //     return <TableCellViewer item={row.original} />;
  //   },
  //   enableHiding: false,
  // },

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
    accessorKey: "type",
    header: () => <HeaderCell label="Application ID" />,

    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.customer_code} />
      </div>
    ),
  },

  {
    accessorKey: "business_name",
    header: () => <HeaderCell label="customers.businessName" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.business_name} />
      </div>
    ),
  },

  {
    accessorKey: "branch_name",
    header: () => <HeaderCell label="customers.branchName" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.branch} />
      </div>
    ),
  },

  {
    accessorKey: "services",
    header: () => <HeaderCell label="customers.services" />,
    cell: ({ row }) => <CustomerServices services={row.original.services} />,
  },

  {
    accessorKey: "email",
    // header: "Email",
    header: () => <HeaderCell label="customers.email" />,
    cell: ({ row }) => (
      <div>
        <RowCell label={row.original.email} />
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: () => <HeaderCell label="customers.status" />,

    cell: ({ row }) => (
      <div>
        <StatusCell status={row.original.status} />
      </div>
    ),
  },

  {
    accessorKey: "actions",
    header: () => <HeaderCell label="customers.actions" />,
    id: "actions",
    // cell: () => <ActionCustomerCell />,
    cell: ({ row }) => (
      <ActionCustomerCell
        id={row.original.id}
        name={row.original.business_name}
      />
    ),
  },
];
