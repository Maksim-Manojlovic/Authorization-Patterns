import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  allowedRoles: string[];
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <div style={{ padding: "2rem", color: "red" }}>Unauthorized</div>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
