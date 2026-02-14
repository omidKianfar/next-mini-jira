import { fileType } from '@/src/hooks/type';
import { FileUploaderType } from '@/src/types/global';
import { Dispatch, SetStateAction } from 'react';

export interface ChatMenuProps {
  MenuHandler?: (type: MenuType) => void;
  showMenu?: boolean;
  setShowMenu?: Dispatch<SetStateAction<boolean>>;
}

export type MenuType = 'text' | 'upload' | 'voice';

export type UploadMenuForm = {
  fileUrl?: string | null;
};

export interface ShowAttachmentProps {
  url: string | null;
  fileType: fileType | null;
}

export interface UploadMenuComponentProps {
  fileUploader: FileUploaderType;
}
