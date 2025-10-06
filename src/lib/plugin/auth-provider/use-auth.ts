import { useContext } from "react";
import { AuthContext } from "./auth-context";

// Hook pour accéder au contexte d’authentification
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth doit être utilisé dans <ApiProvider>");
    return ctx;
}
