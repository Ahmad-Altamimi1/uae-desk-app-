"use client";
import { HandleLogOut } from "@/app/[locale]/(dashboard)/actions";
import { IconLogout } from "@tabler/icons-react";
import React from "react";

const LogOut = () => {
  return (
    <div className="flex items-center gap-2 text-left text-sm leading-tight text-red-500 ml-5">
      <form action={HandleLogOut}>
        <IconLogout />
        <button
          className="truncate text-red-500 text-sm font-bold cursor-pointer"
          type="submit"
        >
          Log out
        </button>
      </form>
    </div>
  );
};

export default LogOut;
