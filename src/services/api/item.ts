import axios from 'axios';
import type {Item, SearchResponse} from '../../types';

const API_BASE = import.meta.env.VITE_API_BASE as string;

// Récupérer tous les items
export const getItems = async (): Promise<Item[]> => {
  const response = await axios.get<Item[]>(`${API_BASE}/catalog/item/`);
  return response.data;
};

// Récupérer un item par ID
export const getItemById = async (id: string): Promise<Item> => {
  const response = await axios.get<Item>(`${API_BASE}/catalog/item/${id}`);
  return response.data;
};

// Récupérer les items aimés par un utilisateur
export const getLikedItemsByUser = async (userId: string): Promise<Item[]> => {
  const response = await axios.get<Item[]>(`${API_BASE}/interaction/liked/${userId}/`);
  return response.data;
};

// Récupérer les items bookmarks par un utilisateur
export const getBookmarkedItemsByUser = async (userId: string): Promise<Item[]> => {
  const response = await axios.get<Item[]>(`${API_BASE}/interaction/bookmarked/${userId}/`);
  return response.data;
};

// Recupérer les resultats de la recherche (filtres et tris)
export const searchItems = async (params: {
  q?: string;
  categories?: string[];
  page?: number;
}): Promise<SearchResponse> => {
  const response = await axios.get(`${API_BASE}/catalog/search/`, {
    params: {
      search: params.q || '',
      categories: params.categories && params.categories.length > 0
        ? params.categories.join(',')
        : undefined,
      page: params.page || 1,
    },
  });

  return response.data;
};