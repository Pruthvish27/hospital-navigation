import { createClient } from "@supabase/supabase-js";

// Replace these with your Supabase project URL and public API key
const supabaseUrl = "https://nucutcyuiznpgrlxzlte.supabase.co"; // Your Supabase URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51Y3V0Y3l1aXpucGdybHh6bHRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3NjUzNjIsImV4cCI6MjA1NzM0MTM2Mn0.2YLxv2VZ4HFu-kKJ66Hk3sAky05j38y_q90zbtYdU3M"; // Your Supabase anon/public key

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);