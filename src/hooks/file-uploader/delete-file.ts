import { supabase } from "@/config/supabase";
import { deleteUploadedFileProps } from "../type";

export const deleteFile = async ({ path }: deleteUploadedFileProps) => {
  if (path) await supabase.storage.from("uploads").remove([path]);
};
