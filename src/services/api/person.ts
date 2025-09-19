import axios from "axios";
import type {Person} from "../../types";

const API_BASE = import.meta.env.VITE_API_BASE as string;

export const getPeople = async (limit?: number): Promise<Person[]> => {
  const response = await axios.get<Person[]>(`${API_BASE}/catalog/person/`, {
    params: limit ? { limit } : {},
  });
  return response.data;
};

export const getPersonById = async (id: string): Promise<Person> => {
  const response = await axios.get<Person>(`${API_BASE}/catalog/person/${id}`);
  return response.data;
};
