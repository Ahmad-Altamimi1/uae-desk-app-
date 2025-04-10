
import React from "react";
import { useTranslations } from "next-intl"; 
import CreateButton from "@/components/table/createButton";
import Image from "next/image";

interface ToolBar2Props {
  title: string;
  description: string;
  image: string;
  addButton:{
    title: string;
    href: string;
  }

}

const ToolBar2 = ({title, description, image,addButton}: ToolBar2Props) => {
    const {title: buttonTitle, href:buttonHref } = addButton;
  const t = useTranslations(); 

  return (
    <div className="flex justify-between items-center mt-6 mb-4 px-6 lg:px-18">
      <div className="flex items-center gap-4">
        <Image
          src={image}
          alt="Profile"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <h2 className="text-[25px] font-bold text-gray-800">
            {t(title)} 
          </h2>
          <p className="text-sm text-gray-500">
            {t(description)} 
          </p>
        </div>
      </div>

      <CreateButton title={buttonTitle} href={buttonHref} /> 
    </div>
  );
};

export default ToolBar2;
