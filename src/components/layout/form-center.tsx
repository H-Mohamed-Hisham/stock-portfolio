import React from "react";

export function FormCenter({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-start-4 md:col-span-6">{children}</div>
    </div>
  );
}
