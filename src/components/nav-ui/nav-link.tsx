import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

// Types
import { TAppMenu } from "@/types";

export function NavLink({ menu }: { menu: TAppMenu }) {
  // Router
  const { pathname } = useLocation();

  return (
    <Link
      to={menu.link}
      className={clsx(
        "flex items-center gap-x-2 p-2 font-semibold rounded-sm",
        {
          "bg-primary text-primary-foreground": pathname === menu.link,
        },
        {
          "hover:bg-primary hover:text-primary-foreground":
            pathname !== menu.link,
        }
      )}
    >
      {menu.icon}
      <span>{menu.label}</span>
    </Link>
  );
}
