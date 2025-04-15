import React from "react";
import { Badge } from "@/components/ui/badge";

interface StatusCellProps {
  status: number;
  className?: string;
}

export const StatusCell = ({ status, className }: StatusCellProps) => {
  let statusClass = "";
  let statusLabel = "";
  // '"pending" | "default" | "secondary" | "destructive" | "outline" | null | undefined
  switch (status) {
    case 0:
      statusClass = "pending";
      statusLabel = "pending";
      break;
    case 1:
      statusClass = "secondary";
      statusLabel = "In Process ";
      break;
    case 2:
      statusClass = "success";
      statusLabel = "Verified ";
      break;
    case 3:
      statusClass = "red";
      statusLabel = "Completed ";
      break;
    default:
      statusClass = "badge-secondary";
      statusLabel = "Unknown Status";
      break;
  }

  return (
    <Badge variant={statusClass} className={className}>
      {statusLabel}
    </Badge>
  );
};
