import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }
  if (location.pathname === "/feed" && userInfo.role !== "user") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
