import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/plugin/auth-provider";

interface ProtectedRouteProps {
  children: JSX.Element;
  roles?: string[]; // roles autorisés, undefined = tous les users connectés
}

export const ProtectedRoute = ({ children, roles }: ProtectedRouteProps): JSX.Element => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

if (roles && (!user?.role || !roles.includes(user.role))) {
  return <Navigate to="/" replace />;
}


  return children;
};
