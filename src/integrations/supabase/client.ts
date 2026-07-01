import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://omqbvshzljogjloluafm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tcWJ2c2h6bGpvZ2psb2x1YWZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwMjIyNjQsImV4cCI6MjA1NDU5ODI2NH0.CPFzgM6UVevRzH14vAWMNN4xn7g9SZmOY9pv1cRerU8"; // your anon key

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
