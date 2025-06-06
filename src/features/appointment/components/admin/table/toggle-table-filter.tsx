"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LucideIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function ToggleTableTabs({
  name,
  icon: Icon,
}: {
  name: string;
  icon?: LucideIcon;
}) {
  const { watch, setValue } = useFormContext();
  const value = watch(name);

  return (
    <div className="flex-wrap space-y-2">
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(v: any) => v && setValue(name, v)}
        className="gap-6"
      >
        <ToggleGroupItem
          value="today"
          className="data-[state=on]:bg-[#E98651] data-[state=on]:border-none data-[state=on]:text-white rounded-lg border px-4"
          style={{
            boxShadow:
              value === "today" ? "0px 2px 4px 0px #001F5280 inset" : "",
          }}
        >
          Today
        </ToggleGroupItem>
        <ToggleGroupItem
          value="upcoming"
          className="data-[state=on]:bg-[#E98651] data-[state=on]:border-none data-[state=on]:text-white rounded-lg border px-6"
          style={{
            boxShadow:
              value === "upcoming" ? "0px 2px 4px 0px #001F5280 inset" : "",
          }}
        >
          Up-coming
        </ToggleGroupItem>
        <ToggleGroupItem
          value="completed"
          className="data-[state=on]:bg-[#E98651] data-[state=on]:border-none data-[state=on]:text-white rounded-lg border px-6"
          style={{
            boxShadow:
              value === "completed" ? "0px 2px 4px 0px #001F5280 inset" : "",
          }}
        >
          Completed
        </ToggleGroupItem>
        <ToggleGroupItem
          value="all"
          className="data-[state=on]:bg-[#E98651] data-[state=on]:border-none data-[state=on]:text-white rounded-lg border px-4"
          style={{
            boxShadow: value === "all" ? "0px 2px 4px 0px #001F5280 inset" : "",
          }}
        >
          All
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
