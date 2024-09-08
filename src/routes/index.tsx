import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

// Components
import { RouteOutlet } from "@/components/routes";

// Constants
import {
  HOME_URL,
  SIGN_IN_URL,
  DASHBOARD_URL,
  TRANSACTION_URL,
  ASSET_TRANSACTION_URL,
} from "@/constants/routes";

// Pages
import {
  HomePage,
  SignInPage,
  DashboardPage,
  TransactionPage,
  AssetTransactionPage,
  PageNotFound,
} from "@/pages";

const AUTH_ROUTES = [
  {
    path: SIGN_IN_URL,
    element: <SignInPage />,
  },
];

const PUBLIC_ROUTES = [
  {
    path: HOME_URL,
    element: <HomePage />,
  },
];

const PRIVATE_ROUTES = [
  {
    path: DASHBOARD_URL,
    element: <DashboardPage />,
  },
  {
    path: TRANSACTION_URL,
    element: <TransactionPage />,
  },
  {
    path: ASSET_TRANSACTION_URL,
    element: <AssetTransactionPage />,
  },
];

export function AppRoutes() {
  // const { token } = useSelector(authState);

  const token = "token";
  // const token = null;

  return (
    <Router>
      <Routes>
        {/* 404 Page */}
        <Route path="*" element={<PageNotFound />} />

        {/* Auth */}
        <Route element={<RouteOutlet token={token} outletType="auth" />}>
          {AUTH_ROUTES.map((route, i) => (
            <Route
              path={route.path}
              element={route.element}
              key={`auth-route-${i}`}
            />
          ))}
        </Route>

        {/* Public  */}
        <Route element={<RouteOutlet token={token} outletType="public" />}>
          {PUBLIC_ROUTES.map((route, i) => (
            <Route
              path={route.path}
              element={route.element}
              key={`public-route-${i}`}
            />
          ))}
        </Route>

        {/* Private */}
        <Route element={<RouteOutlet token={token} outletType="private" />}>
          {PRIVATE_ROUTES.map((route, i) => (
            <Route
              path={route.path}
              element={route.element}
              key={`private-route-${i}`}
            />
          ))}
        </Route>
      </Routes>
    </Router>
  );
}
