import { supabase } from '@/configs/supabase';

interface deleteUploadedFileProps {
  path: string | null;
}
export const deleteFile = async ({ path }: deleteUploadedFileProps) => {
  if (path) await supabase.storage.from('uploads').remove([path]);
};
