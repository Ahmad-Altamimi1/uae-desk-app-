import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

interface PageTitleProps {
  title: string;
  description: string;
  image?: string;
}
const PageTitle = ({ description, image, title }: PageTitleProps) => {
  const t = useTranslations();

  return (
    <div className="flex items-center gap-4">
      {image && (
        <Image
          src={image}
          alt="Profile"
          width={50}
          height={50}
          className="rounded-full"
        />
      )}
      <div>
        <h2 className="text-[25px] font-bold text-gray-800">{t(title)}</h2>
        <p className="text-sm text-gray-500">{t(description)}</p>
      </div>
    </div>
  );
};

export default PageTitle;
