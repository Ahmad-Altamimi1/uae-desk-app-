"use client";

import type * as React from "react";
import {
  IconActivity,
  IconCamera,
  IconChartBar,
  IconChecklist,
  IconClock,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconFolderPlus,
  IconGitBranch,
  IconHelp,
  IconHome,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconShieldCheck,
  IconShieldLock,
  IconUserCog,
  IconUsers,
  IconWorldCog,

} from "@tabler/icons-react";


import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { SidebarBackground } from "./sidebarBackGround";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "",
      icon:  IconHome,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: IconUsers,
    },
    {
      title: "Employees",
      url: "/employees",
      icon:IconUserCog,
    },

    {
      title: "Roles",
      url: "/roles",
      icon: IconShieldCheck ,
    },
    {
      title: "Permissions",
      url: "/permissions",
      icon: IconShieldLock ,
    },
    {
      title: "User Activity",
      url: "/permisions",
      icon: IconActivity,
    },
    {
      title: "Systems",
      url: "#",
      icon: IconDatabase,
    },
    {
      title: "Services",
      url: "#",
      icon: IconFileWord,
    },
    {
      title: "Branches",
      url: "#",
      icon: IconGitBranch ,
    },
    {
      title: "shifts",
      url: "#",
      icon: IconClock ,
    },
    {
      title: "Attendances",
      url: "#",
      icon: IconChecklist ,
    },
    // {
    //   title: "Invoices",
    //   url: "#",
    //   icon: IconUsers,
    // },
    // {
    //   title: "Contacts",
    //   url: "#",
    //   icon: IconUsers,
    // },
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Website Settings",
      url: "#",
      icon: IconWorldCog ,
    },
    {
      title: "File Manager",
      url: "#",
      icon: IconFolderPlus ,
    },
  ],
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
  return (
    <Sidebar collapsible="icon" {...props} className="  text-white">
      <SidebarBackground />

      <SidebarHeader className="bg-transparent mt-[30%]">
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
      </SidebarHeader>

      <SidebarContent className="bg-transparent ">
        <div className="flex flex-col justify-center items-center flex-1">
          <NavMain items={data.navMain.slice(0, 15)} />
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
