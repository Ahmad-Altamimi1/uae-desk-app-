import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";


interface HeaderCellProps {
  lable: string;
  column: ColumnDef<any, any>;
  table: any;
}
export const HeaderCell = ({ lable }: HeaderCellProps) => {


  const t = useTranslations('dashboard')
  return (

    <div className="flex items-center">
      {t(lable)}
    </div>

  );
}