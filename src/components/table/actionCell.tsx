"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Swal from "sweetalert2";
import { ServicesService } from "@/lib/api/services/dashboard/services";
// import { ServicesService } from "@/services/dashboard/servicesService";

interface ActionCellProps {
  id: number;
  name: string;
  editAction: () => void;
  onDeleted?: () => Promise<{success: boolean}>; 
}

const ActionCell = ({ id, name, editAction, onDeleted }: ActionCellProps) => {
  const handleDeleteClick = () => {
    Swal.fire({
      title: `Delete Customer`,
      text: `Are you sure you want to delete\n"${name}"?`,
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: "#EE0303",
      cancelButtonColor: "#b0b0b0",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        title: "swal-title text-left",
        htmlContainer: "swal-description text-left text-sm",
        closeButton: "swal-close-btn text-red-500",
        popup: "swal-popup-left rounded-xl",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Deleting service with ID:", id);
        onDeleted?.()
        

          .then(() => {
            Swal.fire("Deleted!", `${name} has been deleted.`, "success");
            onDeleted?.();
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete the service.", "error");
          });
      }
    });
  };

  return (
    <div className="flex gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="link"
              onClick={editAction}
              className="bg-[#00713a13] rounded-3xl flex items-center gap-2"
            >
              <IconEdit className="text-[#00713B]" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-primary">
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="link"
              className="bg-red-100 rounded-3xl flex items-center gap-2"
              onClick={handleDeleteClick}
            >
              <IconTrash className="text-red-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-red-500">
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ActionCell;
