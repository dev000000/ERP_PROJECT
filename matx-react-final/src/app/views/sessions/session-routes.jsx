import { lazy } from "react";

const NotFound = lazy(() => import("./NotFound"));
const DefaultLogin = lazy(() => import("./login/DefaultLogin"));
const DefaultRegister = lazy(() => import("./register/DefaultRegister"));

const sessionRoutes = [
  { path: "/session/signup", element: <DefaultRegister /> },
  { path: "/session/signin", element: <DefaultLogin /> },
  { path: "*", element: <NotFound /> }
];

export default sessionRoutes;
