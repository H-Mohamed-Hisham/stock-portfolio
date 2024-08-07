"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

// Types
import { TLabelValue } from "@/types";

// Components - Shadcn
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  tabs: TLabelValue[];
};

export const MenuTabs = ({ tabs }: Props) => {
  // Pathname
  const pathname = usePathname();

  return (
    <Tabs defaultValue={pathname} className="w-full flex justify-center mb-4">
      <TabsList>
        {tabs.map((item, index) => (
          <TabsTrigger
            key={index}
            asChild
            value={item.value}
            className={clsx(
              "text-sm font-semibold leading-6 rounded-lg px-3 py-1 ",
              {
                "bg-primary text-primary-foreground": pathname === item.value,
              },
              {
                "hover:bg-background hover:text-foreground":
                  pathname !== item.value,
              }
            )}
          >
            <Link href={item.value}>{item.label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
