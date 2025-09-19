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
}

export interface SearchResponse {
  results: Item[];
  count: number;
  next?: string;
  previous?: string;
}

export type UserRole = 'member' | 'admin';

export interface User {
  id: string;
  username: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: UserRole;
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
