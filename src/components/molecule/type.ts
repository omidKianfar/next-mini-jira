import {
  RefObject,
  ChatMessage,
  FileUploaderType,
  MyUserType,
  FieldValues,
  Path,
} from './imports';

interface BaseControllerProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  className?: string;
}

interface InputControllerProps<
  T extends FieldValues,
> extends BaseControllerProps<T> {
  type?: string;
  ref?: RefObject<HTMLInputElement | null>;
  autoFocus?: boolean;
  icon?: React.ReactNode;
  autoComplete?: string;
  disabled?: boolean;
}

interface FileInputControllerProps<
  T extends FieldValues,
> extends BaseControllerProps<T> {
  ref?: RefObject<HTMLInputElement | null>;
  onChange?: (event: any) => void;
  disabled?: boolean;
  accept?: string;
}

type TextareaControllerProps<T extends FieldValues> = BaseControllerProps<T> & {
  rows?: number;
};
interface SelectOption {
  label: string;
  value: string | number;
}
interface SelectControllerProps<
  T extends FieldValues,
> extends BaseControllerProps<T> {
  options: SelectOption[];
}

type DateInputFieldProps<T extends FieldValues> = BaseControllerProps<T>;
interface ErrorProps {
  errors: any;
}
interface UploadAvatarProps {
  photo: string | undefined;
  uploadHandler: (event: any) => void;
  uploading?: boolean;
  progress?: number;
}
type CartType = {
  title: string;
  description: string;
  onClick: () => void;
  price?: number;
  icon: React.ReactNode;
};
interface ChatMessageItemProps {
  message: ChatMessage;
  handleTemplateSelect?: (text: string) => void;
}
interface WaveformPlayerProps {
  audioUrl: string | null;
}
interface RecorderProps {
  fileUploader: FileUploaderType;
}
interface RecorderComponentProps {
  fileUploader: FileUploaderType;
}
interface ModalComponentProps {
  handleClose: () => void;
  clickHandler: () => void;
  isDelete?: boolean;
  title: string;
  description?: string;
}
interface ChatSidebar {
  userChat: MyUserType | null;
  currentUser: MyUserType | null;
}

export type {
  BaseControllerProps,
  InputControllerProps,
  FileInputControllerProps,
  TextareaControllerProps,
  SelectOption,
  SelectControllerProps,
  DateInputFieldProps,
  ErrorProps,
  UploadAvatarProps,
  CartType,
  ChatSidebar,
  ModalComponentProps,
  ChatMessageItemProps,
  WaveformPlayerProps,
  RecorderProps,
  RecorderComponentProps,
};
