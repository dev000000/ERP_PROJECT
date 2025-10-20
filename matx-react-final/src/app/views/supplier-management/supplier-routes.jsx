import { lazy } from "react";

const SupplierIndex = lazy(() => import("./Supplier/SupplierIndex"));
const MaterialsIndex = lazy(() => import("./Materials/MaterialsIndex"));
const PurchaseInvoicesIndex = lazy(() => import("./PurchaseInvoices/PurchaseInvoicesIndex"));

const supplierRoutes = [
  { path: "/supplier/list", element: <SupplierIndex /> },
  { path: "/supplier/materials", element: <MaterialsIndex /> },
  { path: "/supplier/purchase-invoices", element: <PurchaseInvoicesIndex /> },

];

export default supplierRoutes;
