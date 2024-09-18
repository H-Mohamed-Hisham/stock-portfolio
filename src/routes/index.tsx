import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";

// Providers
import { authState } from "@/providers/redux/slice/auth-slice";

// Components
import { RouteOutlet } from "@/components/routes";

// Constants
import {
  HOME_URL,
  SIGN_IN_URL,
  DASHBOARD_URL,
  TRANSACTION_URL,
  TRANSACTION_ASSET_URL,
  CREATE_TRANSACTION_URL,
} from "@/constants/routes";

// Pages
import {
  HomePage,
  SignInPage,
  DashboardPage,
  TransactionPage,
  AssetTransactionPage,
  CreateTransactionPage,
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
    path: CREATE_TRANSACTION_URL,
    element: <CreateTransactionPage />,
  },
  {
    path: TRANSACTION_URL,
    element: <TransactionPage />,
  },
  {
    path: TRANSACTION_ASSET_URL,
    element: <AssetTransactionPage />,
  },
];

export function AppRoutes() {
  // Redux
  const { access_token } = useSelector(authState);

  return (
    <Router>
      <Routes>
        {/* 404 Page */}
        <Route path="*" element={<PageNotFound />} />

        {/* Auth */}
        <Route element={<RouteOutlet token={access_token} outletType="auth" />}>
          {AUTH_ROUTES.map((route, i) => (
            <Route
              path={route.path}
              element={route.element}
              key={`auth-route-${i}`}
            />
          ))}
        </Route>

        {/* Public  */}
        <Route
          element={<RouteOutlet token={access_token} outletType="public" />}
        >
          {PUBLIC_ROUTES.map((route, i) => (
            <Route
              path={route.path}
              element={route.element}
              key={`public-route-${i}`}
            />
          ))}
        </Route>

        {/* Private */}
        <Route
          element={<RouteOutlet token={access_token} outletType="private" />}
        >
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
