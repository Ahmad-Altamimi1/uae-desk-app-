"use client";

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";

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
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(true);

  // Find the active item
  const activeItem = items.find(
    (item) =>
      pathname === "/dashboard" + item.url ||
      (pathname === "/dashboard" && item.url === "/")
  );

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {/* First menu with Quick Create and Inbox buttons - keep as is */}
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Quick Create</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Second menu with navigation - convert dropdown to submenu */}
        <SidebarMenu>
          <SidebarMenuItem>
            {/* Main navigation button */}
            <SidebarMenuButton
              tooltip="Navigation"
              className="text-white hover:bg-white hover:text-primary w-full justify-between"
              onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
            >
              <div className="flex items-center gap-2">
                <Menu className="h-4 w-4" />
                <span>{activeItem ? activeItem.title : "Navigation"}</span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 ml-2 transition-transform",
                  isSubmenuOpen && "rotate-180"
                )}
              />
            </SidebarMenuButton>

            {/* Submenu with navigation items */}
            {isSubmenuOpen && (
              <SidebarMenuSub>
                {items.map((item) => {
                  const fullUrl =
                    "/dashboard" + (item.url === "/" ? "" : item.url);
                  const isActive =
                    pathname === fullUrl ||
                    (pathname === "/dashboard" && item.url === "/");

                  return (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuSubButton asChild isActive={isActive}>
                        <Link
                          href={fullUrl}
                          className="flex items-center gap-2 w-full"
                        >
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  );
                })}
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
