import { lazy } from "react";

const Maintenance = lazy(() => import("../Maintenance"));
const saleRoutes = [
  { path: "/sales", element: <Maintenance /> },
];

export default saleRoutes;