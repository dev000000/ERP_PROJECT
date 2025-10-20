import { lazy } from "react";

const Maintenance = lazy(() => import("../Maintenance"));

const inventoryRoutes = [
  { path: "/inventory", element: <Maintenance /> },
];

export default inventoryRoutes;