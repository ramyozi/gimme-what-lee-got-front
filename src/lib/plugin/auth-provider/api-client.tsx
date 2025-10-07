import axios from "axios";
import { tokenStorage } from "./token-storage.ts";

// Base URL du backend
const API_BASE = import.meta.env.VITE_API_BASE;

// Création du client axios global
export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter automatiquement le token JWT
apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccess();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Intercepteur pour gérer les erreurs globales (401, etc.)
apiClient.interceptors.response.use(
    (res) => res,
    async (error) => {
      const original = error.config;
      if (error.response?.status === 401 && !original._retry) {
        original._retry = true;
        try {
          const refresh = tokenStorage.getRefresh();
          if (!refresh) throw error;
          const { data } = await axios.post(`${API_BASE}/auth/token/refresh/`, { refresh });
          tokenStorage.set(data.access, data.refresh || refresh);
          original.headers.Authorization = `Bearer ${data.access}`;
          return apiClient(original);
        } catch (e) {
          tokenStorage.clear();
          window.location.href = "/login";
        }
      }
      throw error;
    }
);

// Fournisseur de fetcher standard pour SWR
export const swrFetcher = async (url: string) => {
  const res = await apiClient.get(url);
  return res.data;
};