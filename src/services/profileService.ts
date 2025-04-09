
import { supabase } from "@/integrations/supabase/client";
import { Profile, ProfileUpdate } from "@/types/database.types";

export const getProfile = async (userId: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // Profile not found
    }
    console.error("Error fetching profile:", error);
    throw error;
  }

  return data as Profile;
};

export const updateProfile = async (userId: string, updates: ProfileUpdate): Promise<Profile> => {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating profile:", error);
    throw error;
  }

  return data as Profile;
};

export const getSellerProfile = async (sellerId: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", sellerId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // Profile not found
    }
    console.error("Error fetching seller profile:", error);
    throw error;
  }

  return data as Profile;
};
