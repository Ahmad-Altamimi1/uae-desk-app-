import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";


interface HeaderCellProps {
  lable: string;
    column: ColumnDef<any, any>;
    table: any;
}
export const HeaderCell =     ({lable }:HeaderCellProps) => {


  // const isSorted = column.getIsSorted();
  // const isMultiSorted = column.getIsMultiSorted();
  // const isResizing = column.getIsResizing();
  // const isSelected = column.getIsSelected();
const t = useTranslations('dashboard')
  return (
    // <div
    //   className={`flex items-center justify-between px-4 py-2 ${
    //     isSorted ? "bg-blue-100" : ""
    //   } ${isResizing ? "bg-gray-200" : ""}`}
    // >
      <div className="flex items-center">
        {t(lable)}
        {/* {isSorted && <span>{isMultiSorted ? "🔼" : "🔽"}</span>} */}
      </div>
      // {isSelected && <span>✔️</span>}
    // </div>
  );
}