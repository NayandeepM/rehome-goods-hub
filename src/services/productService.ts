import { supabase } from "@/integrations/supabase/client";
import { Product, ProductInsert, ProductUpdate } from "@/types/database.types";
import { mockProducts } from "@/pages/Browse/data/mockProducts";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      // Return mock data as fallback
      return mockProducts as unknown as Product[];
    }

    if (!data || data.length === 0) {
      // If no data from Supabase, return mock data
      return mockProducts as unknown as Product[];
    }

    return data as Product[];
  } catch (error) {
    console.error("Exception fetching products:", error);
    // Return mock data as fallback
    return mockProducts as unknown as Product[];
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // Product not found
    }
    console.error("Error fetching product:", error);
    throw error;
  }

  return data as Product;
};

export const createProduct = async (product: ProductInsert): Promise<Product> => {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

  if (error) {
    console.error("Error creating product:", error);
    throw error;
  }

  return data as Product;
};

export const updateProduct = async (id: string, updates: ProductUpdate): Promise<Product> => {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating product:", error);
    throw error;
  }

  return data as Product;
};

export const deleteProduct = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .eq("status", "available")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products by category:", error);
      // Return filtered mock data as fallback
      return mockProducts.filter(p => p.category === category) as unknown as Product[];
    }

    if (!data || data.length === 0) {
      // If no data from Supabase, return filtered mock data
      return mockProducts.filter(p => p.category === category) as unknown as Product[];
    }

    return data as Product[];
  } catch (error) {
    console.error("Exception fetching products by category:", error);
    // Return filtered mock data as fallback
    return mockProducts.filter(p => p.category === category) as unknown as Product[];
  }
};

export const getProductsBySeller = async (sellerId: string): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("seller_id", sellerId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products by seller:", error);
      throw error;
    }

    return data as Product[];
  } catch (error) {
    console.error("Exception fetching products by seller:", error);
    throw error;
  }
};
