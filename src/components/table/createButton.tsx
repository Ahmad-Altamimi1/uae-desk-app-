import { IconPlus } from "@tabler/icons-react";
import React from "react";
import { Button } from "../ui/button";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
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
      <Button variant="outline" size="sm">
        <IconPlus />
        <span className="hidden lg:inline"> {t(title)}</span>
      </Button>
    </Link>
  );
};

export default CreateButton;
