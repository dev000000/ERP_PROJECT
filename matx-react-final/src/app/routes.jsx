import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";
import sessionRoutes from "./views/sessions/session-routes";
import NotFound from "./views/sessions/NotFound";
import inventoryRoutes from "./views/inventory-management/inventory-routes";
import saleRoutes from "./views/sale-management/sale-routes";
import financeRoutes from "./views/finance-management/finance-routes";
import staffRoutes from "./views/staff-management/staff-routes";
import customerRoutes from "./views/customer-management/customer-routes";
import supplierRoutes from "./views/supplier-management/supplier-routes";


// DASHBOARD PAGE
const Analytics = Loadable(lazy(() => import("app/views/dashboard/Analytics")));

const routes = [
  { path: "/", element: <Navigate to="dashboard/default" /> },
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...inventoryRoutes,
      ...saleRoutes,
      ...financeRoutes,
      ...staffRoutes,
      ...customerRoutes,
      ...supplierRoutes,
      // dashboard route
      { path: "/dashboard/default", element: <Analytics />, auth: authRoles.admin },

    ]
  },

  // session pages route
  ...sessionRoutes,
  { path: "*", element: <NotFound /> },

];

export default routes;
