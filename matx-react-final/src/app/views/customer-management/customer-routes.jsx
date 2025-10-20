import { lazy } from "react";

const CustomerIndex = lazy(() => import("./Customer/CustomerIndex"));
const SupportIndex = lazy(() => import("./Support/SupportIndex"));
const OrderIndex = lazy(() => import("./Order/OrderIndex"));

const customerRoutes = [
  { path: "/customer/list", element: <CustomerIndex /> },
  { path: "/customer/support", element: <SupportIndex /> },
  { path: "/customer/order", element: <OrderIndex /> },

];

export default customerRoutes;
