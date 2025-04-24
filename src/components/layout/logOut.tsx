"use client";
import { HandleLogOut } from "@/app/[locale]/(dashboard)/actions";
import { IconLogout } from "@tabler/icons-react";
import React from "react";
import Cookies from "js-cookie";
import { useLocale } from "next-intl";

const LogOutForm = () => {
  const lang = useLocale()
  const LogOut =async () => {
     const logOut= await HandleLogOut();
     
    if (logOut) {
      Cookies.remove("user");
    Cookies.remove("permissions");
    Cookies.remove("role");
    window.location.replace(`/${lang}/login`);
    
    }
}
  return (
    <form action={LogOut}>
      <div className="flex items-center gap-2 text-left text-sm leading-tight text-red-500 ml-5 py-2">
        <IconLogout />
        <button
          className="truncate text-red-500 text-sm font-bold cursor-pointer"
          type="submit"
        >
          Log out
        </button>
      </div>
    </form>
  );
};

export default LogOutForm;
