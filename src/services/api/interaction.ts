import type { UserInteraction } from '../../types';
import {apiClient} from "../../lib/plugin/auth-provider/api-client.tsx";

// Créer une interaction (like, bookmark, rating)
export const createInteraction = async (
    userId: string,
    itemId: string,
    type: 'like' | 'bookmark' | 'rating',
    rating?: number
): Promise<UserInteraction> => {
  const res = await apiClient.post<UserInteraction>('/interaction/', {
    user: userId,
    item: itemId,
    interaction_type: type,
    rating,
  });
  return res.data;
};

// Supprimer une interaction
export const deleteInteraction = async (interactionId: string): Promise<void> => {
  await apiClient.delete(`/interaction/${interactionId}/`);
};
