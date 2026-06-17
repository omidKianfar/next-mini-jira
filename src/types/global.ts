import { Dispatch, SetStateAction } from 'react';
import { RenderElementProps, RenderLeafProps } from 'slate-react';
import { Descendant } from 'slate';
import { FieldValues, Path } from 'react-hook-form';
import { fileType, uploadProps } from '../hooks/file-uploader/type';

enum UserType {
  Client = 'client',
  Admin = 'admin',
}

type MyUserType = {
  email: string | null;
  userId: string;
  userType: UserType;
  isActive: boolean;
  photo: string | null;
  userName: string | null;
  birthday: string | null;
  createdAt: string | null;
  isGuest: boolean;
  payment: {
    isPaid: boolean | null;
    freeTrialEnabled: boolean | null;
    planType: string | null;
    subscriptionId: string | null;
    trialEnd: string | null;
    createdAt: string | null;
    endAt: string | null;
  };
};

type AuthContextActionType = 'INITIALIZE' | 'IS_LOADING' | 'ERROR';

type AuthLoading =
  | 'SIGN_OUT'
  | 'INITIALIZING'
  | 'SIGN_UP_WITH_EMAIL'
  | 'SIGN_IN_WITH_EMAIL'
  | 'SIGN_IN_WITH_GOOGLE';

type SignPropsType = {
  email: string;
  password: string;
};

type UserPasswordUpdateType = {
  newPassword: string;
};

type UserProfileType = {
  userId: string;
  data?: Partial<MyUserType>;
};

type AuthStateType = {
  user: MyUserType | null;
  isLoading: string | null;
  isAuthenticated: boolean;
};

type AuthContextStateType = {
  user: MyUserType | null;
  isLoading: AuthLoading | null;
  isInitialized: boolean;
  isAuthenticated: boolean;
};

type AuthContextProps = AuthContextStateType & {
  signupWithEmail: ({
    email,
    password,
  }: SignPropsType) => Promise<MyUserType | void>;
  signinWithEmail: ({
    email,
    password,
  }: SignPropsType) => Promise<MyUserType | void>;
  googleSignin: () => Promise<void>;
  updatePasswordGoogle: ({
    newPassword,
  }: UserPasswordUpdateType) => Promise<void>;
  addOrUpdatePasswordForCurrentUser: ({
    newPassword,
  }: UserPasswordUpdateType) => Promise<void>;
  logout: () => Promise<void>;
  saveUserProfile: ({ userId, data }: UserProfileType) => Promise<void>;
  terialMode: ({ userId }: UserProfileType) => Promise<void>;
  changeStep: (newStep: string) => void;
  stepNumber: string;
};

interface ProfileProps {
  photo?: string;
  userName: string;
  birthday: string;
}

type PlanType = 'monthly' | 'yearly';

type TaskStatus = 'todo' | 'inprogress' | 'done';

type TagType = 'task' | 'bug';

type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  tag: TagType;
  createdAt: string;
  attachment?: {
    fileUrl?: string | null;
    fileType?: string | null;
  };
  userId: string;
  updatedAt?: string;
};

type TaskForm = {
  title: string;
  description: string;
  tag: TagType;
  attachment?: {
    fileUrl?: string | null;
    fileType?: string | null;
  };
};

type TaskState = {
  tasks: Task[];
};

type Columns = {
  label: string;
  value: string;
};

type ColumnID = 'todo' | 'inprogress' | 'done';
interface ColumnProps {
  id: ColumnID;
  children: React.ReactNode;
}

type TaskFiltersState = {
  tag: string | null;
  date: {
    from: string | null;
    to: string | null;
  };
};

type SortOrder = 'asc' | 'desc';

type UserState = {
  users: MyUserType[];
  sortOrder: SortOrder;
};

type UserFiltersState = {
  status: string | null;
  createdAt: {
    from: string | null;
    to: string | null;
  };
};

type chatsState = {
  chats: ChatsType[];
};

type ChatFiltersState = {
  updatedAt: {
    from: string | null;
    to: string | null;
  };
};

type ChatMessage = {
  id?: string;
  chatId?: string;
  senderId: string;
  receiverId: string;
  text?: string;
  createdAt?: string;
  senderType: UserType;
  read?: boolean;
  attachment?: {
    fileUrl?: string | null;
    fileType?: string | null;
  };
};

type ChatContextType = {
  messages: ChatMessage[];
  chatId: string | null | undefined;
  userChat: MyUserType | null;
};

type ChatMessageType = {
  createdAt: string;
  updatedAt: string;
  lastMessageSenderId: UserType;
  lastMessageText: string;
  lastMessageSenderType: string;
  lastMessageRead: boolean;
  lastMessageAttachment: {
    fileUrl: string;
    fileType: string;
  };
};

type ChatUserType = {
  email: string;
  photo: string;
  status: boolean;
  userId: string;
  username: string;
};

type ChatsType = {
  id: string;
  message: ChatMessageType;
  user: ChatUserType;
};

interface HeaderProps {
  showSidebar?: boolean;
  setShowSidebar?: Dispatch<SetStateAction<boolean>>;
  menuRef?: React.RefObject<HTMLDivElement> | null;
}

interface chatSidebarProps extends HeaderProps, ModalProps {
  chat: ChatsType;
}

type MenuType = 'text' | 'upload' | 'voice';

interface ChatMenuProps {
  MenuHandler?: (type: MenuType) => void;
  showMenu?: boolean;
  setShowMenu?: Dispatch<SetStateAction<boolean>>;
  editorKey?: number;
  editMessageId?: string | null;
  setEditMessageId?: Dispatch<SetStateAction<string | null>>;
  Menu?: MenuType;
  setMenu?: Dispatch<SetStateAction<MenuType>>;
}

type ModalProps = React.PropsWithChildren & {
  open: boolean;
  handleClose?: () => void;
  handleOpenModal?: (modalNumber: number) => void;
};

interface CustomEmoji {
  id: string;
  name: string;
  native: string;
  keywords: string[];
}

type EditorContextType = {
  editorOutput?: string;
  setEditorOutput?: Dispatch<SetStateAction<string>>;
  fontColorState?: string | null;
  setFontColorState?: Dispatch<SetStateAction<string | null>>;
  showColorDropdown?: boolean;
  setShowColorDropdown?: Dispatch<SetStateAction<boolean>>;
  fontBgColorState?: string | null;
  setFontBgColorState?: Dispatch<SetStateAction<string | null>>;
  showBackgroundDropdown?: boolean;
  setShowBackgroundDropdown?: Dispatch<SetStateAction<boolean>>;
  showEmojiPicker?: boolean;
  setShowEmojiPicker?: Dispatch<SetStateAction<boolean>>;
  fontFamilyState?: string;
  setFontFamilyState?: Dispatch<SetStateAction<string>>;
  renderElement?: (props: RenderElementProps) => React.ReactElement;
  renderLeaf?: (props: RenderLeafProps) => React.ReactElement;
  editor?: any;
  document?: Document;
  changeColor?: (color: string | null) => void;
  changeBackgroundColor?: (color: string | null) => void;
  changeFontFamily?: (fontFamily: string) => void;
  insertEmoji?: (emoji: CustomEmoji) => void;
  deserializedNodes?:
    | Descendant[]
    | {
        type: string;
        children: {
          text: string;
        }[];
      }[];
  resetEditor: () => void;
};

type FileUploaderType = {
  upload: ({ file, avatar, userId }: uploadProps) => Promise<string | null>;
  cancel: () => Promise<void>;
  reset: () => void;
  progress: number;
  uploading: boolean;
  url: string | null;
  error: string | null;
  fileType: fileType | null;
  realPath: string | null;
};

type UploadMenuForm = {
  fileUrl?: string | null;
};

interface UploadMenuComponentProps {
  fileUploader: FileUploaderType;
}

interface ChatSidebar {
  userChat: MyUserType | null;
  currentUser: MyUserType | null;
}

type CartType = {
  title: string;
  description: string;
  onClick: () => void;
  price?: number;
  icon: React.ReactNode;
};

type ButtonType = 'button' | 'submit' | 'reset';

interface BaseControllerProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  className?: string;
}

type InputFieldsProps<T extends FieldValues> = BaseControllerProps<T>;

export { UserType };
export type {
  MyUserType,
  AuthContextActionType,
  AuthLoading,
  SignPropsType,
  UserPasswordUpdateType,
  UserProfileType,
  AuthStateType,
  AuthContextStateType,
  AuthContextProps,
  ProfileProps,
  PlanType,
  TaskStatus,
  TagType,
  Task,
  TaskForm,
  TaskState,
  Columns,
  ColumnID,
  ColumnProps,
  TaskFiltersState,
  SortOrder,
  UserState,
  UserFiltersState,
  chatsState,
  ChatFiltersState,
  ChatMessage,
  ChatContextType,
  ChatMessageType,
  ChatUserType,
  ChatsType,
  HeaderProps,
  chatSidebarProps,
  MenuType,
  ChatMenuProps,
  ModalProps,
  CustomEmoji,
  EditorContextType,
  FileUploaderType,
  UploadMenuForm,
  UploadMenuComponentProps,
  ChatSidebar,
  CartType,
  ButtonType,
  BaseControllerProps,
  InputFieldsProps,
};
