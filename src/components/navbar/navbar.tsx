import React from // {useState}
"react";

// Components
// import {ThemeToggle} from "@/components/navbar"

export function navbar() {
  // Local State
  // const [open, setOpen] = useState<boolean>(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background text-foreground">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      ></nav>
    </header>
  );
}
