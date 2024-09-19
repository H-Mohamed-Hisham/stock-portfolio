import React from "react";

// Shadcn
import { Input } from "@/components/ui/input";

export function GlobalFilter({
  globalFilter,
  setGlobalFilter,
  placeholder,
}: {
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}) {
  return (
    <Input
      placeholder={`Filter by ${placeholder}`}
      value={globalFilter || ""}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        setGlobalFilter(event.target.value)
      }
      className="max-w-sm"
    />
  );
}
