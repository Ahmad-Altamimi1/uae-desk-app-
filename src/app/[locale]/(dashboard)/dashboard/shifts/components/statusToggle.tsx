// components/StatusToggle.tsx
"use client";

import { Switch } from "@/components/ui/switch";

type StatusToggleProps = {
  id: number;
  isActive: boolean;
  onChange?: (id: number, newValue: boolean) => void;
};

export const StatusToggle = ({ id, isActive, onChange }: StatusToggleProps) => {
  const handleChange = (value: boolean) => {
    // Call parent handler if needed (e.g. API call to update status)
    onChange?.(id, value);
  };

  return (
    <Switch
      onCheckedChange={(e) => handleChange(e)}
      defaultChecked={isActive}
    />
  );
};
