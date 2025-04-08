"use client";
import { SidebarCircuitPattern } from "./sidebar-circuit-pattern";
import { cn } from "@/lib/utils";
import { useSidebar } from "../ui/sidebar";

export function SidebarBackground() {
  const { open } = useSidebar();
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden">
      <div
        className={cn("absolute inset-0 ", !open && "bg-primary")}
        style={{
          backgroundImage: open
            ? `url(/images/dashboard/sidebar/background.svg`
            : "",
        }}
      />
      <SidebarCircuitPattern />
    </div>
  );
}
