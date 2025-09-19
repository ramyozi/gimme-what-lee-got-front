import axios from 'axios';
import type { User } from '../../types';

const API_BASE = import.meta.env.VITE_API_BASE as string;

// Inscription
export const registerRequest = (data: any) => {
  return axios.post(`${API_BASE}/auth/register/`, data);
};

// Connexion
export const loginRequest = (data: any) => {
  return axios.post(`${API_BASE}/auth/login/`, data);
};

// Récupérer l'utilisateur connecté
export const getMeRequest = (token: string): Promise<User> => {
  return axios.get<User>(`${API_BASE}/auth/me/`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(res => res.data);
};

// Rafraîchir le token
export const refreshTokenRequest = async (refresh: string) => {
  const response = await axios.post(`${API_BASE}/auth/token/refresh/`, { refresh });
  return response.data;
};

// màj le user connecté
export const patchUserRequest = async (userId: string, data: Partial<User>): Promise<User> => {
  const response = await axios.patch<User>(`${API_BASE}/accounts/${userId}/`, data);
  return response.data;
};
