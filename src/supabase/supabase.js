import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://vozbqbvaultodqeuimqv.supabase.co";
export const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvemJxYnZhdWx0b2RxZXVpbXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE2MTY2OTcsImV4cCI6MjAxNzE5MjY5N30.PKc51wQgjn5Do7NTl7Rps2Po3uSosHHlAKDzuf2H5Ag";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
