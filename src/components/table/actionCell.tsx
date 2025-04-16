"use client";

import React from "react";
import { Button } from "../ui/button";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ConfirmDeleteDialog } from "../common/ConfirmDeleteDialog";
import { useRouter } from "@/i18n/navigation";

interface ActionCellProps {
  id: number;
  name: string;
  editAction: () => void;
  onDeleted?: () => Promise<void>;
}

const ActionCell = ({ id, name, editAction, onDeleted }: ActionCellProps) => {
  const router = useRouter();
  const handleDeleteClick = () => {
    ConfirmDeleteDialog({
      title: "Delete Confirmation",
      message: "Are you sure you want to delete",
      itemName: name,
      onDelete: async () => {
        if (onDeleted) {
          await onDeleted();
        }
        // router.refresh();
      },
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
