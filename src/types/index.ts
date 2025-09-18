export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Person {
  id: number;
  name: string;
  bio?: string;
  website?: string;
}

export interface Item {
  id: number;
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

export interface User {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: string;
}

export type InteractionType = 'like' | 'bookmark' | 'rating';

export interface UserInteraction {
  id: number;
  user: User;
  item: Item;
  interaction_type: InteractionType;
  rating?: number;
  created_at: string;
}
