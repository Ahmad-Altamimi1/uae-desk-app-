import { IconPlus } from "@tabler/icons-react";
import React from "react";
import { Button } from "../ui/button";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

interface createButtonPops {
  title: string;
  href: string;
}
const CreateButton = async ({ title, href }: createButtonPops) => {
  const locale = await getLocale();
  const t = await getTranslations({ locale });
  if (!href) return null;


  return (
    <Link href={href}>
      <Button className="bg-[#00713B] px-6 py-3 text-base">
        <Image src="/plus.png" alt="Logo" width={24} height={24} />
        <span className="hidden lg:inline">{t(title)}</span>
      </Button>

    </Link>
  );
};

export default CreateButton;
