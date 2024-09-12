import React from "react";

// Components
import { Header } from "@/components/nav-ui";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full">
      <Header />
      <main className="mt-16 p-6 ">{children}</main>
    </div>
  );
}
