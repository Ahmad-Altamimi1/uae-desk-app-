"use client";

import React from "react";

import type { Dispatch, JSX, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface TabItem {
  name: string;
  component: JSX.Element;
}

interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
  setActiveHeader?: Dispatch<SetStateAction<number>>;
}

const TabsComponent = ({
  items,
  defaultValue,
  className,
  setActiveHeader,
}: TabsProps) => {
  const t = useTranslations();

  const [activeTab, setActiveTab] = React.useState(
    defaultValue || items[0]?.name
  );
  
  return (
    <div className={cn("w-full flex flex-col", className)}>
      <div className="w-full flex border-0 border-b-3">
        {items.map((item, index) => (
          <React.Fragment key={`${item.name }${index}`}>
            <button
              className={cn(
                "flex-1 py-4 px-2 text-gray-600 relative transition-colors cursor-pointer",
                activeTab === item.name && "text-primary font-medium"
              )}
              key={item.name}
              onClick={() => {
                setActiveHeader?.(index);
                setActiveTab(item.name);
              }}
            >
              {t(item.name)}
              {activeTab === item.name && (
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-primary" />
              )}
            </button>
            {/* {index < items.length - 1 && (
              <div className="h-full w-px bg-gray-200 self-stretch" />
            )} */}
          </React.Fragment>
        ))}
      </div>
      <div className="w-full mt-4">
        {items.map((item) => (
          <div
            key={item.name}
            className={cn("w-full", activeTab !== item.name && "hidden")}
          >
            {item.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsComponent;
