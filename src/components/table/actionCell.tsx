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
import { PermissionTypes } from "@/utils/type";
import {  useHasPermission } from "@/hooks/useHasPermission";

interface ActionCellProps {
  id: number;
  name: string;
  edit: {permission:PermissionTypes, Action:() => void};
  onDelete?: {permission:PermissionTypes, Action:() => void};
}

const ActionCell = ({ id, name, edit, onDelete }: ActionCellProps) => {
    const hasPermission=useHasPermission()
  
  const handleDeleteClick = () => {
    ConfirmDeleteDialog({
      title: "Delete Confirmation",
      message: "Are you sure you want to delete",
      itemName: `name : ${name} id : ${id} `,

      onDelete: async () => {
        if (onDelete?.Action) {
          onDelete.Action();

        }
      },
    });
  };

  return (
    <div className="flex gap-4">
          { hasPermission(edit.permission) &&
      <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="link"
              onClick={edit.Action}
              className="bg-[#00713a13] rounded-3xl flex items-center gap-2 cursor-pointer"
              >
              <IconEdit className="text-[#00713B]" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-primary">
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
            }
          { onDelete?.permission && hasPermission(onDelete.permission) &&

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="link"
              className="bg-red-100 rounded-3xl flex items-center gap-2 cursor-pointer"
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
}
    </div>
  );
};

export default ActionCell;
