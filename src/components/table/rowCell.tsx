import { cn } from "@/lib/utils";

interface RowCellProps {
  label: string;
  className?: string;
}

export const RowCell = ({ label, className }: RowCellProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center min-w-[100px] text-center",
        className
      )}
    >
      {label}
    </div>
  );
};
