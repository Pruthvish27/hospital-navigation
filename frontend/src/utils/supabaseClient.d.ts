// src/utils/supabaseClient.d.ts
import { SupabaseClient } from '@supabase/supabase-js';

declare module "@/utils/supabaseClient" {
    const supabase: SupabaseClient;
    export default supabase;
}