import React from "react";
import {
  IconEdit,
  IconTrash,
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

const ActionCustomerCell = () => {
  const handleClick = (action: string) => {
    console.log(`${action} clicked`);
  };

  return (
    <div className="flex gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger >
            <Button
              size="sm"
              variant="link"
              className="bg-gray-200 rounded-3xl flex items-center gap-2 cursor-pointer"
              aria-label="View Customer"
              onClick={() => handleClick("View Customer")}
            >
              <IconEye className="text-black" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-black">
            <p>View Customer</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              size="sm"
              variant="link"
              className="bg-[#E88019] rounded-3xl flex items-center gap-2 cursor-pointer"
              aria-label="Edit Customer Photo"
              onClick={() => handleClick("Edit Customer Photo")}
            >
              <IconPhoto className="text-white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-[#E88019]">
            <p>Edit Customer Photo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

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

      <TooltipProvider>
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
      </TooltipProvider>

      <ActionCell />
    </div>
  );
};

export default ActionCustomerCell;
