import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

interface PrivateRouteProps {
  children: JSX.Element;
  requiredRole?: string;
}

export default function PrivateRoute({
  children,
  requiredRole,
}: PrivateRouteProps) {
  const { user } = useAuth();

  const isAuthenticated = !!user;
  const hasRequiredRole = requiredRole ? user?.role === requiredRole : true;

  if (!isAuthenticated || !hasRequiredRole) {
    return <Navigate to="/login" />;
  }

  return children;
}
