import React from "react";

// Shadcn
import { Toaster } from "@/components/ui/toaster";

// Components
import { Header } from "@/components/nav-ui";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full">
      <Header />
      <main className="mt-16 p-6 ">{children}</main>
      <Toaster />
    </div>
  );
}
