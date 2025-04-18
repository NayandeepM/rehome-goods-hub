
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const SUPABASE_URL = "https://gbktemzlultokvrtaqmt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdia3RlbXpsdWx0b2t2cnRhcW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjUwMDAsImV4cCI6MjA1OTgwMTAwMH0.Y-W4ee91A99jXjRZB9JDCnY-fBMnb5QfMhPh5KRiXH0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
