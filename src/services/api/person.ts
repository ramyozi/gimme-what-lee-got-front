import type { Person } from '../../types';
import {apiClient} from "../../lib/plugin/auth-provider/api-client.tsx";

// Récupérer toutes les personnes
export const getAllPersons = async (): Promise<Person[]> => {
  const res = await apiClient.get<Person[]>("/catalog/person/");
  return res.data;
};

// Récupérer une personne par ID
export const getPersonById = async (id: string): Promise<Person> => {
  const res = await apiClient.get<Person>(`/catalog/person/${id}/`);
  return res.data;
};

export const createPerson = async (data: Omit<Person, "id">): Promise<Person> => {
  const res = await apiClient.post<Person>("/catalog/person/", data);
  return res.data;
};

// Mettre à jour une personne
export const updatePerson = async (
    id: string,
    data: Partial<Person>
): Promise<Person> => {
  const res = await apiClient.patch<Person>(`/catalog/person/${id}/`, data);
  return res.data;
};
