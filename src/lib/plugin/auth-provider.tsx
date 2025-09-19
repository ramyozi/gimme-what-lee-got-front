import {createContext, useContext, useState, useEffect, type ReactNode} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {loginRequest} from "../../services/api/account.ts";
import {type User} from "../../types";

const API_BASE = import.meta.env.VITE_API_BASE as string;

// Type du contexte
interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(localStorage.getItem("access") || null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer l'utilisateur connecté
  const fetchMe = async (accessToken: string) => {
    const response = await axios.get<User>(`${API_BASE}/auth/me/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  };

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const response = await loginRequest(credentials);
      const { access, refresh } = response.data;

      setToken(access);
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      const me = await fetchMe(access);
      setUser(me);

      navigate("/"); // redirection après login
    } catch (error: unknown) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
  setToken(null);
  setUser(null);
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  navigate("/login");
};


  // Vérification automatique du token au chargement
  useEffect(() => {
    const initUser = async () => {
      if (token) {
        try {
          const me = await fetchMe(token);
          setUser(me);
        } catch {
          logout();
        }
      }
      setLoading(false);
    };
    initUser();
  }, []);

  if (loading) {
    return <div style={{ padding: 16 }}>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook pour utiliser le contexte Auth
/* eslint-disable react-refresh/only-export-components */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};

export default AuthProvider;
