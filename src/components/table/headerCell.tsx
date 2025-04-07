import { useLocale } from "next-globe-gen";
import { useTranslations } from "next-intl";

interface HeaderCellProps {
  label: string;
}
export const HeaderCell = ({ label }: HeaderCellProps) => {
  // const isSorted = column.getIsSorted();
  // const isMultiSorted = column.getIsMultiSorted();
  // const isResizing = column.getIsResizing();
  // const isSelected = column.getIsSelected();
  // const locale = useLocale();
  const t = useTranslations("dashboard");
  

  return (
    // <div
    //   className={`flex items-center justify-between px-4 py-2 ${
    //     isSorted ? "bg-blue-100" : ""
    //   } ${isResizing ? "bg-gray-200" : ""}`}
    // >
    <div className="flex items-center">
      {t(label)}
      {/* {isSorted && <span>{isMultiSorted ? "🔼" : "🔽"}</span>} */}
    </div>
    // {isSelected && <span>✔️</span>}
    // </div>
  );
};
