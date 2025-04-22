"use client";
import React from "react";
import CreateButton from "@/components/table/createButton";
import PageTitle from "../ui/pageTitle";
import { PermissionTypes } from "@/utils/type";
import {  useHasPermission } from "@/hooks/useHasPermission";

interface ToolBar2Props {
  title: string;
  description: string;
  image?: string;
  addButton?: {
    title: string;
    href: string;
  permission:PermissionTypes

  };
}

const ToolBar2 = ({ title, description, image, addButton }: ToolBar2Props) => {
    const hasPermission=useHasPermission()
  
  return (
    <div className="flex justify-between items-center mt-6 mb-4 px-6 lg:px-18">
      <PageTitle title={title} description={description} image={image} />
    {addButton && !!hasPermission(addButton.permission) && (
      <CreateButton title={addButton.title} href={addButton.href} />
    )}
    </div>
  );
};

export default ToolBar2;
