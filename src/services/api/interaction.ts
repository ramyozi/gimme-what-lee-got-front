import type { UserInteraction } from '../../types';
import {apiClient} from "../../lib/plugin/auth-provider/api-client.tsx";

// Créer une interaction (like, bookmark, rating)
export const createInteraction = async (
    userId: string,
    itemId: string,
    type: 'like' | 'bookmark' | 'rating',
    rating?: number
): Promise<UserInteraction> => {
  const res = await apiClient.post<UserInteraction>('/catalog/interaction/', {
    user: userId,
    item: itemId,
    interaction_type: type,
    rating,
  });
  return res.data;
};

// Supprimer une interaction
export const deleteInteraction = async (interactionId: string): Promise<void> => {
  await apiClient.delete(`/catalog/interaction/${interactionId}/`);
};


/**
 * fetch tous les interactions d'un utilisateur pour un item donné
 * -> utile pour vérifier si un utilisateur a déjà liké ou bookmarké un item
 */
export const getUserItemInteractions = async (
    userId: string,
    itemId: string
): Promise<UserInteraction[]> => {
  const response = await apiClient.get<UserInteraction[]>(
      `/catalog/interaction/user/${userId}/item/${itemId}/`
  );
  return response.data;
};