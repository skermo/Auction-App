import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const NeedlessAuth = () => {
  const { auth } = useAuth();
  const { location } = useLocation();

  return !auth?.user ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default NeedlessAuth;
