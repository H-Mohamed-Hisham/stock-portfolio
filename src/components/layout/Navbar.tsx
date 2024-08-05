"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

// Icons
import { Menu, Sun, Moon, ChevronDown } from "lucide-react";

// Constants
import { navbar_menu, navbar_transaction_menu } from "@/constants/menu";

// Components - Shadcn
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  // Theme
  const { setTheme } = useTheme();

  // Pathname
  const pathname = usePathname();

  // Session
  const { data: session } = useSession();

  // Local State
  const [providers, setProviders] = useState(null);

  // UseEffect
  useEffect(() => {
    const setAuthProviders = async () => {
      const res: any = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background text-foreground">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">HMH</span>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>HMH</AvatarFallback>
            </Avatar>
          </Link>
        </div>

        {/*Large Screen */}

        {/* Menu */}
        <div className="hidden lg:flex lg:gap-x-4 lg:items-center">
          {navbar_menu.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "text-sm font-semibold leading-6 rounded-lg px-3 py-1 ",
                {
                  "bg-primary text-primary-foreground": pathname === item.href,
                },
                {
                  "hover:bg-primary hover:text-primary-foreground":
                    pathname !== item.href,
                }
              )}
            >
              {item.name}
            </Link>
          ))}

          <Menubar className="border-0 p-0">
            <MenubarMenu>
              <MenubarTrigger className=" p-0 hover:bg-primary hover:text-primary-foreground">
                <div
                  className={clsx(
                    "flex items-center gap-x-2 text-sm font-semibold leading-6 rounded-lg px-3 py-1 cursor-pointer "
                  )}
                >
                  Test
                  <ChevronDown
                    aria-hidden="true"
                    className="h-5 w-5 flex-none"
                  />
                </div>
              </MenubarTrigger>
              <MenubarContent className="px-1 py-2">
                {navbar_transaction_menu.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      "group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 font-semibold",
                      {
                        "bg-primary text-primary-foreground":
                          pathname === item.href,
                      },
                      {
                        "hover:bg-primary hover:text-primary-foreground":
                          pathname !== item.href,
                      }
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>

        {/* Theme Switcher & Login/Logout */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-2">
          {!session && (
            <>
              {providers &&
                Object.values(providers).map((provider: any, index: number) => (
                  <button
                    key={index}
                    className="text-sm font-semibold leading-6 rounded-lg px-3 py-1  hover:bg-primary hover:text-primary-foreground"
                    onClick={() => signIn(provider.id)}
                  >
                    <span>Login or Register</span>
                  </button>
                ))}
            </>
          )}

          {session && (
            <button
              className="text-sm font-semibold leading-6 rounded-lg px-3 py-1 hover:bg-primary hover:text-primary-foreground"
              onClick={() => signOut()}
            >
              <span>Logout</span>
            </button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Small Screen */}

        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  {/* Logo*/}
                  <div className="flex items-center justify-between">
                    <Link href="/" className="-m-1.5 p-1">
                      <span className="sr-only">HMH</span>
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>HMH</AvatarFallback>
                      </Avatar>
                    </Link>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flow-root text-left">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {/* Menu */}
                    {navbar_menu.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={clsx(
                          "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7",
                          {
                            "bg-primary text-primary-foreground":
                              pathname === item.href,
                          },
                          {
                            "hover:bg-primary hover:text-primary-foreground":
                              pathname !== item.href,
                          }
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}

                    <Accordion type="single" collapsible className="-mx-3">
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="flex items-center pl-3 pr-3 py-2 rounded-lg text-base font-semibold leading-7 hover:no-underline hover:bg-primary hover:text-primary-foreground">
                          Menu1
                        </AccordionTrigger>
                        <AccordionContent>
                          {navbar_menu.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={clsx(
                                "block rounded-lg py-2 pl-3 pr-3 text-sm font-semibold leading-7",
                                {
                                  "bg-primary text-primary-foreground":
                                    pathname === item.href,
                                },
                                {
                                  "hover:bg-primary hover:text-primary-foreground":
                                    pathname !== item.href,
                                }
                              )}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {/* Theme Switcher & Login/Logout */}
                    {!session && (
                      <>
                        {providers &&
                          Object.values(providers).map(
                            (provider: any, index: number) => (
                              <button
                                key={index}
                                className="-mx-3 w-full flex rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-primary hover:text-primary-foreground"
                                onClick={() => signIn(provider.id)}
                              >
                                <span>Login or Register</span>
                              </button>
                            )
                          )}
                      </>
                    )}

                    {session && (
                      <button
                        className={clsx(
                          "-mx-3 w-full flex rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-primary hover:text-primary-foreground"
                        )}
                        onClick={() => signOut()}
                      >
                        Logout
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};
