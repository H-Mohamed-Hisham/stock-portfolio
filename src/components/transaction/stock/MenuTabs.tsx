"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

// Constants
import { menu_tabs } from "@/constants/menu-tabs";

// Components - Shadcn
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const MenuTabs = () => {
  // Pathname
  const pathname = usePathname();

  return (
    <Tabs defaultValue={pathname} className="w-full flex justify-center">
      <TabsList>
        {menu_tabs.map((item, index) => (
          <TabsTrigger key={index} value={item.value}>
            <Link href={item.value}>{item.label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
