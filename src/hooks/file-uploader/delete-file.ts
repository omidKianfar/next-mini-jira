import { supabase } from "@/config/supabase";

export async function deleteFile(path: string | null) {
  if (path) await supabase.storage.from("uploads").remove([path]);
}
