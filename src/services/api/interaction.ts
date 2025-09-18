import axios from 'axios';
import type { UserInteraction } from '../../types';

const API_BASE = import.meta.env.VITE_API_BASE as string;

// Créer une interaction (like, bookmark, rating)
export const createInteraction = async (
  userId: string,
  itemId: string,
  type: 'like' | 'bookmark' | 'rating',
  rating?: number
): Promise<UserInteraction> => {
  const response = await axios.post<UserInteraction>(`${API_BASE}/interaction/`, {
    user: userId,
    item: itemId,
    interaction_type: type,
    rating,
  });
  return response.data;
};

// Supprimer une interaction
export const deleteInteraction = async (interactionId: string): Promise<void> => {
  await axios.delete(`${API_BASE}/interaction/${interactionId}/`);
};
