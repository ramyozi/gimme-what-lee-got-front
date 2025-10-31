import {Navigate, useLocation} from "react-router-dom";
import type {RoleEnum} from "../types";
import {useAuth} from "../lib/plugin/auth-provider/use-auth.ts";

interface ProtectedRouteProps {
  children: JSX.Element;
  roles?: RoleEnum[]; // roles autorisés, undefined = tous les users connectés
}

export const ProtectedRoute = ({ children, roles }: ProtectedRouteProps): JSX.Element => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;
  if (!user) {
    const redirectTo = location.pathname + location.search;
    return <Navigate to="/login" state={{ from: redirectTo }} replace />;
  }

if (roles && (!user?.role || !roles.includes(user.role as RoleEnum))) {
  return <Navigate to="/" replace />;
}


  return children;
};
