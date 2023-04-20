import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import { LOGIN } from "../routes/routes";

const ProtectedLayout = () => {
  const { auth, loading } = useAuth();
  const { location } = useLocation();

  if (auth === undefined || loading) {
    return null;
  }

  return auth.user ? (
    <Outlet />
  ) : (
    <Navigate to={LOGIN} state={{ from: location }} replace />
  );
};

export default ProtectedLayout;
