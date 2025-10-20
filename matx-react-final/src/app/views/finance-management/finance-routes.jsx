import { lazy } from "react";

const Maintenance = lazy(() => import("../Maintenance"));
const financeRoutes = [
  { path: "/finance", element: <Maintenance /> },
];

export default financeRoutes;