"use client";
import { useTranslations } from "next-intl";

interface InputCollectionLabelProps {
  title: string;
  className?: string;
}

const InputCollectionLabel = ({
  title,
  className = "",
}: InputCollectionLabelProps) => {
  const t = useTranslations();
  const titleTranslate = t(title);
  return (
    <div
      className={`flex items-center  gap-2 font-bold text-primary ${className}`}
    >
      <div className="relative flex items-center justify-center w-3 h-3 bg-primary-foreground rounded-full overflow-hidden">
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] bg-primary rounded-full "></span>
      </div>
      <p className="m-0 p-0">{titleTranslate}</p>
    </div>
  );
};

export default InputCollectionLabel;
