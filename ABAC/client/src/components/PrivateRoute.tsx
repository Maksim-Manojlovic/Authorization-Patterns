import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthenticated = false; // placeholder

  return isAuthenticated ? children : <Navigate to="/login" />;
}
