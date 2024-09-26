// Icons
import { LayoutDashboard, Building2, ArrowRightLeft } from "lucide-react";

// Constants
import { DASHBOARD_URL, ASSET_URL, TRANSACTION_URL } from "@/constants/routes";

export const app_menu = [
  {
    label: "Dashboard",
    link: DASHBOARD_URL,
    base_link: "dashboard",
    icon: <LayoutDashboard />,
  },
  {
    label: "Asset",
    link: ASSET_URL,
    base_link: "asset",
    icon: <Building2 />,
  },
  {
    label: "Transaction",
    link: TRANSACTION_URL,
    base_link: "transaction",
    icon: <ArrowRightLeft />,
  },
];
