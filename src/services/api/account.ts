import type { User } from '../../types';
import {apiClient} from "../../lib/plugin/auth-provider/api-client.tsx";

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

// Inscription
export const registerRequest = async (data: RegisterData) => {
  const response = await apiClient.post('/auth/register/', data);
  return response.data;
};

// Connexion
export const loginRequest = async (data: LoginData) => {
  const response = await apiClient.post('/auth/login/', data);
  return response.data; // { access, refresh }
};

// Récupérer l'utilisateur connecté
export const getMe = async (): Promise<User> => {
  const response = await apiClient.get<User>('/auth/me/');
  return response.data;
};

// Rafraîchir le token
export const refreshTokenRequest = async (refresh: string) => {
  const response = await apiClient.post('/auth/token/refresh/', { refresh });
  return response.data;
};

// màj le user connecté
export const patchUserRequest = async (userId: string, data: Partial<User>): Promise<User> => {
  const response = await apiClient.patch<User>(`/auth/users/${userId}/`, data);
  return response.data;
};
