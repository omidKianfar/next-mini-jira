type fileType = 'image' | 'video' | 'file' | 'voice';

interface uploadProps {
  file: File;
  avatar?: boolean;
  userId?: string;
}

export type { fileType, uploadProps };
