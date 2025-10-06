import type { Person } from '../../types';
import {apiClient} from "../../lib/plugin/auth-provider/api-client.tsx";

// Récupérer toutes les personnes
export const getPeople = async (limit?: number): Promise<Person[]> => {
  const res = await apiClient.get<Person[]>('/catalog/person/', {
    params: limit ? { limit } : {},
  });
  return res.data;
};

// Récupérer une personne par ID
export const getPersonById = async (id: string): Promise<Person> => {
  const res = await apiClient.get<Person>(`/catalog/person/${id}/`);
  return res.data;
};
