
import { Database } from "@/integrations/supabase/types";

// Extract types from the Database type
export type Tables = Database['public']['Tables'];

// Products
export type Product = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  condition: string;
  category: string;
  location: string | null;
  created_at: string;
  updated_at: string;
  seller_id: string;
  status: string;
  images: string[];
};

export type ProductInsert = Omit<Product, 'id' | 'created_at' | 'updated_at'>;
export type ProductUpdate = Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>;

// Profiles
export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  avatar_url: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
};

export type ProfileUpdate = Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;

// Favorites
export type Favorite = {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
};

export type FavoriteInsert = Omit<Favorite, 'id' | 'created_at'>;

// Messages
export type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  product_id: string | null;
  content: string;
  read: boolean;
  created_at: string;
};

export type MessageInsert = Omit<Message, 'id' | 'created_at' | 'read'>;

// Reviews
export type Review = {
  id: string;
  reviewer_id: string;
  reviewee_id: string;
  product_id: string | null;
  rating: number;
  comment: string | null;
  created_at: string;
};

export type ReviewInsert = Omit<Review, 'id' | 'created_at'>;

// Orders
export type Order = {
  id: string;
  buyer_id: string;
  seller_id: string;
  product_id: string;
  status: string;
  total_amount: number;
  created_at: string;
  updated_at: string;
};

export type OrderInsert = Omit<Order, 'id' | 'created_at' | 'updated_at'>;
export type OrderUpdate = Partial<Omit<Order, 'id' | 'created_at' | 'updated_at' | 'buyer_id' | 'seller_id' | 'product_id'>>;

// Categories
export type Category = {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
};

export type CategoryInsert = Omit<Category, 'id' | 'created_at'>;
