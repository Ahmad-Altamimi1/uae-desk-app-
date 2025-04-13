import { IconPlus } from "@tabler/icons-react";
import React from "react";
import { Button } from "../ui/button";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

interface CreateButtonProps {
  title: string;
  href?: string;
  type?: "submit" | "button";
}

const CreateButton = async ({
  title,
  href,
  type = "button",
}: CreateButtonProps) => {
  const locale = await getLocale();
  const t = await getTranslations({ locale });

  const Comp: React.ElementType = href ? Link : "div";

  return (
    <Comp {...(href ? { href } : {})}>
      <Button
        className="bg-[#00713B] px-6 py-3 text-base flex items-center gap-2 cursor-pointer"
        type={type}
      >
        <Image src="/plus.png" alt="Logo" width={24} height={24} />
        <span className="hidden lg:inline">{t(title)}</span>
      </Button>
    </Comp>
  );
};

export default CreateButton;
