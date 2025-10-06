import { createContext } from "react";

export interface AuthContextType {
    user: any | null;
    loading: boolean;
    login: (access: string, refresh: string) => void;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

// Contexte d’authentification global
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
