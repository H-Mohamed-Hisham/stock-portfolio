import { Navigate, Outlet } from "react-router-dom";

// Constants
import { SIGN_IN_URL, DASHBOARD_URL } from "@/constants/routes";

export function RouteOutlet({
  token,
  outletType,
}: {
  token: string | null;
  outletType: "auth" | "public" | "private";
}) {
  if (outletType === "private") {
    return token !== null ? <Outlet /> : <Navigate to={SIGN_IN_URL} />;
  } else if (outletType === "auth") {
    return token === null ? <Outlet /> : <Navigate to={DASHBOARD_URL} />;
  } else {
    return <Outlet />;
  }
}
