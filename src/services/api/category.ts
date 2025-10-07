import { apiClient } from '../../lib/plugin/auth-provider/api-client.tsx';
import type { Category } from '../../types';

// Récupérer toutes les catégories
export const getCategories = async (limit?: number): Promise<Category[]> => {
  const res = await apiClient.get<Category[]>('/catalog/category/', {
    params: limit ? { limit } : {},
  });
  return res.data;
};

// Récupérer une catégorie par ID
export const getCategoryById = async (id: string): Promise<Category> => {
  const res = await apiClient.get<Category>(`/catalog/category/${id}/`);
  return res.data;
};

// Créer une nouvelle catégorie
export const createCategory = async (data: {
  name: string;
  description?: string;
}): Promise<Category> => {
  const res = await apiClient.post<Category>('/catalog/category/', data);
  return res.data;
};
