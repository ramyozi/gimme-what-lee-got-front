import { useState, useEffect, type ReactNode } from "react";
import {getMe, loginRequest} from "../../../services/api/account";
import { tokenStorage } from "./token-storage";
import { AuthContext, type AuthContextType } from "./auth-context";

// Fournisseur d’authentification (gère utilisateur + tokens)
export function ApiProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    // Récupère le profil utilisateur actuel
    const refreshUser = async () => {
        const token = tokenStorage.getAccess();
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const data = await getMe();
            setUser(data);
        } catch {
            tokenStorage.clear();
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    // Sauvegarde des tokens et rechargement du user
    const login = async (username: string, password: string) => {
        try {
            const { access, refresh } = await loginRequest({ username, password });
            tokenStorage.set(access, refresh);
            await refreshUser();
        } catch (err) {
            console.error("Login failed:", err);
            throw err;
        }
    };

    // Déconnexion complète
    const logout = () => {
        tokenStorage.clear();
        setUser(null);
    };

    const value: AuthContextType = { user, loading, login, logout, refreshUser };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
