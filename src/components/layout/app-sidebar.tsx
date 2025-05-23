"use client";
import type * as React from "react";
import {
  IconActivity,
  IconCamera,
  IconClock,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconGitBranch,
  IconHelp,
  IconHome,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { SidebarBackground } from "./sidebarBackGround";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useHasPermission } from "@/hooks/useHasPermission";
import { type Icon } from "@tabler/icons-react";
import { useHasRole } from "@/hooks/hasRole";
import { PermissionTypesOptions, RoleTypesOptions } from "@/constants";
import CompanyLogo from "@/public/images/dashboard/commn/Group 8.png";

type NavItem = {
  title: string;
  url: string;
  icon?: Icon;
  visable: boolean;
};

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
 
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  // documents: [
  //   {
  //     name: "Data Library",
  //     url: "#",
  //     icon: IconDatabase,
  //   },
  //   {
  //     name: "Reports",
  //     url: "#",
  //     icon: IconReport,
  //   },
  //   {
  //     name: "Word Assistant",
  //     url: "#",
  //     icon: IconFileWord,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
const [user, setUser] = useState(null);
  const hasPermission = useHasPermission();
  const hasRole = useHasRole();
  const [navMain, setNavMain] = useState<NavItem[]>([]);

  useEffect(() => {
    const loadNavItems = async () => {
      const updatedNavMain: NavItem[] = [
        {
          title: "Home",
          url: "",
          icon: IconHome,
          visable: hasRole(RoleTypesOptions.admin) || hasRole(RoleTypesOptions["super-admin"]),
        },
        {
          title: "Customers",
          url: "/customers",
          icon: IconUsers,
          visable: await hasPermission(PermissionTypesOptions["customers-list"]),
        },
        {
          title: "User Activity",
          url: "/useractivity",
          icon: IconActivity,
          visable: await hasPermission("user-activity"),
        },
        {
          title: "Services",
          url: "/services",
          icon: IconFileWord,
          visable: await hasPermission("services-list"),
        },
        {
          title: "Branches",
          url: "/branches",
          icon: IconGitBranch,
          visable: await hasPermission("branches-list"),
        },
        {
          title: "shifts",
          url: "/shifts",
          icon: IconClock,
          visable: true,
        },
      ];
      setNavMain(updatedNavMain.filter((item) => item.visable));
    };

    loadNavItems();
  }, []);
  useEffect(() => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user="))
    ?.split("=")[1];

  if (cookieValue) {
    setUser(JSON.parse(decodeURIComponent(cookieValue)));
  }
}, []);

  return (
    <Sidebar collapsible="icon" {...props} className="  text-white">
      <SidebarBackground />

      <SidebarHeader className="bg-transparent ">
        {/* <div className="mx-2 rounded-xl bg-white p-3 text-primary shadow-sm">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5"
              >
                <a href="#">
                  <IconInnerShadowTop className="!size-5" />
                  <span className="text-base font-semibold">Acme Inc.</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div> */}
        <div className="bg-white  rounded-xl border py-6 shadow-sm  ">

          <div className="flex items-center space-x-2">
            <Image src={CompanyLogo} alt="Logo" width={136} height={58} />

            <div className="bg-[#00713a1e] p-1 py-5 w-[35px] h-[60px] rounded-xl ">
              <SidebarTrigger />
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-transparent ">
        
        <div className="flex flex-col items-center flex-1 w-full">
          {navMain.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></span>
            </div>
          ) : (
            <NavMain items={navMain} />
          )}
        </div>
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>

      <SidebarFooter className="bg-transparent">
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
    </Sidebar>
  );
}
