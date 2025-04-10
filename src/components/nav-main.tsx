"use client";

import { type Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const pathname = usePathname();
const locale=useLocale();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const fullUrl =  "/dashboard" + (item.url === "/" ? "" : item.url);
            console.log('fullUrl', fullUrl);
            
            const isActive =
              pathname == "/"+locale+fullUrl ||
              (pathname === "/dashboard" && item.url === "/");


            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild  className={cn(
                  isActive && "bg-white text-primary",
                )}>
                  <Link
                    href={fullUrl}
                    className="flex items-center gap-2 w-full"
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
