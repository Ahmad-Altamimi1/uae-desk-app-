import React from "react";
import {
  IconEye,
  IconPhoto,
  IconFileInvoice,
  IconUser,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import ActionCell from "@/components/table/actionCell";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "@/i18n/navigation";
import {  useHasPermission } from "@/hooks/useHasPermission";
import { PermissionTypesOptions } from "@/constants";

interface ActionCustomerCellProps {
  id: number;
  name: string;
}
const ActionCustomerCell = ({ id, name }: ActionCustomerCellProps) => {
  const route = useRouter();
  const handleClick = (action: string) => {
    console.log(`${action} clicked`);
  };
  const hasPermission=useHasPermission()

  return (
    <div className="flex gap-4">
      {PermissionTypesOptions["customers-view"] &&
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              size="sm"
              variant="link"
              className="bg-gray-200 rounded-3xl flex items-center gap-2 cursor-pointer"
              aria-label="View Customer"
              onClick={() => route.push({
                pathname:"/customerView/[customerId]",
                params:{customerId:id}
              })}
            >
              <IconEye className="text-black" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-black">
            <p>View Customer</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
}
      {hasPermission("customers-upload-media") &&

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              size="sm"
              variant="link"
              className="bg-[#E88019] rounded-3xl flex items-center gap-2 cursor-pointer"
              aria-label="Uploaded File"
              // onClick={() => route.push(`/dashboard/customers/create/${id}`)} //TODO
            >
              <IconPhoto className="text-white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-[#E88019]">
            <p>Uploaded Files</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
}
      {hasPermission("customers-invoice")  || true &&

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              size="sm"
              variant="link"
              className="bg-blue-50 rounded-3xl flex items-center gap-2 cursor-pointer"
              aria-label="View Invoice"
              onClick={() => handleClick("View Invoice")}
            >
              <IconFileInvoice className="text-blue-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-blue-500">
            <p>View Invoice</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
}
      {/* <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              size="sm"
              variant="link"
              className="bg-[#8c22b310] rounded-3xl flex items-center gap-2 cursor-pointer"
              aria-label="View User Account"
              onClick={() => handleClick("View User Account")}
            >
              <IconUser className="text-[#8D22B3]" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-[#8D22B3]">
            <p>View User Account</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider> */}
      {/* TODO: Add user account button when user account is created */}

      <ActionCell
        id={id}
        name={name}
        onDelete={{Action:() => handleClick("Delete Customer"),permission:"customers-delete"}}//TODO
        edit={{ permission:"customers-edit",Action: () => route.push(`/dashboard/customers/${id}/edit`)}}
      />
    </div>
  );
};

export default ActionCustomerCell;
