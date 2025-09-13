import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE as string

export const registerRequest = (data: any) => {
  return axios.post(`${API_BASE}/auth/register/`, data);
};

export const loginRequest = (data: any) => {
  return axios.post(`${API_BASE}/auth/login/`, data);
};

export const getMeRequest = (token: string) => {
  return axios.get(`${API_BASE}/me/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
