// Icons
import { LayoutDashboard, Building2, ArrowRightLeft } from "lucide-react";

// Constants
import { DASHBOARD_URL, TRANSACTION_URL, ASSET_URL } from "@/constants/routes";

export const app_menu = [
  { label: "Dashboard", link: DASHBOARD_URL, icon: <LayoutDashboard /> },
  { label: "Asset", link: ASSET_URL, icon: <Building2 /> },
  { label: "Transaction", link: TRANSACTION_URL, icon: <ArrowRightLeft /> },
];
