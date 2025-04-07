import { SidebarCircuitPattern } from "./sidebar-circuit-pattern";

export function SidebarBackground() {
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden">
      <div
        className="absolute inset-0 "
        style={{
          backgroundImage: `url(/images/dashboard/sidebar/background.svg`,
        }}
      />
      <SidebarCircuitPattern />
    </div>
  );
}
