import { Navigate, useLocation } from "react-router-dom";
// HOOK
import useAuth from "app/hooks/useAuth";
import { toast } from "react-toastify";

export default function AuthAdmin({ children }) {
  const { user } = useAuth();
  console.log(user);
  const { pathname } = useLocation();

  if (user.QuyenTruyCap == "Quản trị viên") return <>{children}</>;
  toast.error("Bạn Không có quyền truy cập vào đây");
  return <Navigate replace to="/dashboard/default" state={{ from: pathname }} />;
}
