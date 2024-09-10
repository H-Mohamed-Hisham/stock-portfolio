import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

// Icons
import { Menu } from "lucide-react";

// Constants
import { app_menu } from "@/constants/menu";

// Types
import { TAppMenu } from "@/types";

// Shadcn
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Components
import { ThemeToggle, AuthButton, Logo, NavLink } from "@/components/nav-ui";

export function Header() {
  // Hooks
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  // Local State
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background">
      <nav
        className="flex items-center justify-between p-6"
        aria-label="Global"
      >
        {/* Logo */}
        <Logo />

        {/* Large Screen */}
        {isLargeScreen && (
          <>
            {/* App Menu */}
            <div className="flex items-center gap-x-4">
              {app_menu.map((menu: TAppMenu, index: number) => (
                <NavLink key={index} menu={menu} />
              ))}
            </div>

            {/* Theme Toggle & Auth Button */}
            <div className="flex items-center gap-x-4">
              <ThemeToggle />
              <AuthButton />
            </div>
          </>
        )}

        {/* Mobile Screen */}
        {!isLargeScreen && (
          <div className="flex">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </SheetTrigger>

              <SheetContent className="h-full">
                <SheetHeader>
                  <SheetTitle>
                    {/* Logo*/}
                    <div className="flex items-center justify-between">
                      <Logo />
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <div className="h-full py-10 flex flex-col justify-between">
                  {/* App Menu */}
                  <div className="flex flex-col gap-y-4">
                    {app_menu.map((menu: TAppMenu, index: number) => (
                      <NavLink key={index} menu={menu} />
                    ))}
                  </div>

                  {/* Theme Toggle & Auth Button */}
                  <div className="flex items-center justify-between gap-x-4">
                    <ThemeToggle />
                    <AuthButton />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </nav>
    </header>
  );
}
