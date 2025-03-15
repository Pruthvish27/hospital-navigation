// src/utils/supabaseClient.d.ts

declare module "../utils/supabaseClient" {
    import { SupabaseClient } from "@supabase/supabase-js";
    const supabase: SupabaseClient;
    export default supabase;
  }