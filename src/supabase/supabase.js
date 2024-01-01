import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASEURL;
export const supabaseKey = import.meta.env.VITE_SUPABASEKEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
