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
  const locale = useLocale();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const fullUrl = "/dashboard" + (item.url === "/" ? "" : item.url);
            console.log("fullUrl", fullUrl);

            const isActive =
              pathname == "/" + locale + fullUrl ||
              (pathname === "/dashboard" && item.url === "/");

            return (
              <SidebarMenuItem
                key={item.title}
                className="hover:bg-white hover:text-primary rounded-md"
              >
                <SidebarMenuButton
                  asChild
                  className={cn(
                    isActive && "bg-white text-primary",
                    "transition-all duration-300 ease-in-out transform hover:bg-white hover:text-primary hover:scale-105"
                  )}
                >
                  <Link
                    href={fullUrl}
                    className="flex items-center gap-2 w-full hover:text-primary"
                  >
                    {item.icon && (
                      <item.icon className="h-4 w-4 transition-transform duration-300 ease-in-out hover:rotate-12" />
                    )}
                    <span className="transition-opacity duration-300 ease-in-out hover:opacity-80">
                      {item.title}
                    </span>
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
