import { Navigate, Outlet, useLocation, useParams } from "react-router";
import useAuth from "../hooks/useAuth";
import { LOGIN } from "../routes/routes";

const ProtectedLayout = (requireId = false) => {
  const { auth, loading } = useAuth();
  const { location } = useLocation();
  const { id } = useParams();

  if (auth === undefined || loading) {
    return null;
  }

  return auth.user && (!requireId || auth.user.id === id) ? (
    <Outlet />
  ) : (
    <Navigate to={LOGIN} state={{ from: location }} replace />
  );
};

export default ProtectedLayout;
