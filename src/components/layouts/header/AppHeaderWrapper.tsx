import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthenticatedAppHeader from "./AuthenticatedAppHeader";
import UnauthenticatedAppHeader from "./UnauthenticatedAppHeader.tsx";
import { useAuth } from "../../../lib/plugin/auth-provider/use-auth.ts";

export default function AppHeaderWrapper() {
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Evite de sauvegarder les pages de login, register
    if (
        !["/login", "/register"].includes(location.pathname) &&
        !location.pathname.startsWith("/logout")
    ) {
      // Sauve la dernière page visitée
      sessionStorage.setItem("lastVisitedPath", location.pathname + location.search);
    }
  }, [location]);

  return user ? <AuthenticatedAppHeader /> : <UnauthenticatedAppHeader />;
}
