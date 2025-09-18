import axios from "axios";
import type { Category } from "../../types";

const API_BASE = import.meta.env.VITE_API_BASE as string;

export const getCategories = async (limit?: number): Promise<Category[]> => {
  const response = await axios.get<Category[]>(`${API_BASE}/catalog/category/`, {
    params: limit ? { limit } : {},
  });
  return response.data;
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await axios.get<Category>(`${API_BASE}/catalog/category/${id}`);
  return response.data;
};
