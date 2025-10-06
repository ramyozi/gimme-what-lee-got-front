import {apiClient} from "../../lib/plugin/auth-provider/api-client.tsx";
import type { Item, SearchResponse } from '../../types';

// Récupérer tous les items
export const getItems = async (): Promise<Item[]> => {
  const res = await apiClient.get<Item[]>('/catalog/item/');
  return res.data;
};

// Récupérer un item par ID
export const getItemById = async (id: string): Promise<Item> => {
  const res = await apiClient.get<Item>(`/catalog/item/${id}/`);
  return res.data;
};

// Créer un nouvel item
export const createItem = async (data: Partial<Item>): Promise<Item> => {
  const res = await apiClient.post<Item>('/catalog/item/', data);
  return res.data;
};

// Mettre à jour un item
export const updateItem = async (id: string, data: Partial<Item>): Promise<Item> => {
  const res = await apiClient.patch<Item>(`/catalog/item/${id}/`, data);
  return res.data;
};

// Supprimer un item
export const deleteItem = async (id: string): Promise<void> => {
  await apiClient.delete(`/catalog/item/${id}/`);
};

// Récupérer les items likés par un utilisateur
export const getLikedItemsByUser = async (userId: string): Promise<Item[]> => {
  const res = await apiClient.get<Item[]>(`/interaction/liked/${userId}/`);
  return res.data;
};

// Récupérer les items sauvegardés (bookmarks)
export const getBookmarkedItemsByUser = async (userId: string): Promise<Item[]> => {
  const res = await apiClient.get<Item[]>(`/interaction/bookmarked/${userId}/`);
  return res.data;
};

// Rechercher des items avec filtres et pagination
export const searchItems = async (params: {
  q?: string;
  categories?: string[];
  page?: number;
}): Promise<SearchResponse> => {
  const res = await apiClient.get<SearchResponse>('/catalog/search/', {
    params: {
      search: params.q || '',
      categories: params.categories?.length ? params.categories.join(',') : undefined,
      page: params.page || 1,
    },
  });
  return res.data;
};
