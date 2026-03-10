import {
  Dispatch,
  fileType,
  FileUploaderType,
  SetStateAction,
} from '../imports';

interface ChatMenuProps {
  MenuHandler?: (type: MenuType) => void;
  showMenu?: boolean;
  setShowMenu?: Dispatch<SetStateAction<boolean>>;
  editorKey?: number;
  editMessageId?: string | null;
  setEditMessageId?: Dispatch<SetStateAction<string | null>>;
}

type MenuType = 'text' | 'upload' | 'voice';

type UploadMenuForm = {
  fileUrl?: string | null;
};

interface ShowAttachmentProps {
  url: string | null;
  fileType: fileType | null;
}

interface UploadMenuComponentProps {
  fileUploader: FileUploaderType;
}

export type {
  ChatMenuProps,
  MenuType,
  ShowAttachmentProps,
  UploadMenuForm,
  UploadMenuComponentProps,
};
