export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Person {
  id: string;
  name: string;
  bio?: string | null;
  website?: string | null;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  category?: Category;
  image?: string;
  url?: string;
  tags?: string[];
  authors?: Person[];
  producers?: Person[];
  contributors?: Person[];
  created_by?: User;
  rating?: number;
  number_of_ratings?: number;
  popularity_score?: number;
}

export interface SearchResponse {
  results: Item[];
  count: number;
  next?: string;
  previous?: string;
}

export enum RoleEnum {
  Admin = 'admin',
  Member = 'user'
}

export interface User {
  id: string;
  username: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: RoleEnum;
}

export type InteractionType = 'like' | 'bookmark' | 'rating';

export interface UserInteraction {
  id: string;
  user: User;
  item: Item;
  interaction_type: InteractionType;
  rating?: number;
  created_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: T[];
}
