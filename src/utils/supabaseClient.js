import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
  console.warn(
    'Peringatan: VITE_SUPABASE_URL atau VITE_SUPABASE_ANON_KEY belum diatur di file frontend/.env Anda!'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
