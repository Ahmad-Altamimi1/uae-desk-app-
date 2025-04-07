"use client";
import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";

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

  // Find the active item to display in the dropdown trigger
  const activeItem = items.find(
    (item) =>
      pathname === "/dashboard" + item.url ||
      (pathname === "/dashboard" && item.url === "/")
  );

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
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

        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  tooltip="Navigation"
                  className="text-white hover:bg-white hover:text-primary w-full justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Menu className="h-4 w-4" />
                    <span>{activeItem ? activeItem.title : "Navigation"}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start" className="w-56">
                <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {items.map((item) => {
                  const fullUrl =
                    "/dashboard" + (item.url === "/" ? "" : item.url);
                  const isActive =
                    pathname === fullUrl ||
                    (pathname === "/dashboard" && item.url === "/");

                  return (
                    <DropdownMenuItem
                      key={item.title}
                      className={cn(
                        "cursor-pointer flex items-center gap-2",
                        isActive && "bg-muted font-medium"
                      )}
                      asChild
                    >
                      <Link href={fullUrl}>
                        {item.icon && <item.icon className="h-4 w-4" />}
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
