import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nucutcyuiznpgrlxzlte.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51Y3V0Y3l1aXpucGdybHh6bHRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3NjUzNjIsImV4cCI6MjA1NzM0MTM2Mn0.2YLxv2VZ4HFu-kKJ66Hk3sAky05j38y_q90zbtYdU3M';
export const supabase = createClient(supabaseUrl, supabaseKey);