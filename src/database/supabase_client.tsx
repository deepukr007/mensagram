import { createClient } from "@supabase/supabase-js";
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
const supabaseKey =
  import.meta.env.VITE_SUPABASE_KEY || process.env.VITE_SUPABASE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);
const main_table_name = "title_imageURL";
const storage_path = "mensa_images/food_images";

export { supabase, main_table_name, storage_path, supabaseUrl };
