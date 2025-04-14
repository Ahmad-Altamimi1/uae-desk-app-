"use client";
import React from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useTranslations } from "next-intl";
interface Props {
  name?: string;
  placeholder?: string;
}
const Password = ({ name = "password", placeholder }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const t = useTranslations("dashboard.updatePassword");
  const passwordPlaceholder = placeholder ? t(placeholder) : t("placeholder");

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={"abc123"}
        placeholder={passwordPlaceholder}
        className="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <div className="absolute left-3 top-3.5 text-gray-500">
        <FiLock />
      </div>
      <div
        className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </div>
    </div>
  );
};

export default Password;
