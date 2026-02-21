import { Dispatch, SetStateAction } from 'react';
import { RenderElementProps, RenderLeafProps } from 'slate-react';
import { CustomEmoji } from '../components/molecule/slatejs-editor-component/type';
import { Descendant } from 'slate';
import { fileType, uploadProps } from '../hooks/type';

export enum UserType {
  Client = 'client',
  Admin = 'admin',
}

export type MyUserType = {
  email: string | null;
  userId: string;
  userType: UserType;
  isActive: boolean;
  photo: string | null;
  userName: string | null;
  birthday: string | null;
  createdAt: string | null;
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

export type AuthContextActionType = 'INITIALIZE' | 'IS_LOADING' | 'ERROR';

export type AuthLoading =
  | 'SIGN_OUT'
  | 'INITIALIZING'
  | 'SIGN_UP_WITH_EMAIL'
  | 'SIGN_IN_WITH_EMAIL'
  | 'SIGN_IN_WITH_GOOGLE';

export type AuthContextStateType = {
  user: MyUserType | null;
  isLoading: AuthLoading | null;
  isInitialized: boolean;
  isAuthenticated: boolean;
};

export type AuthContextProps = AuthContextStateType & {
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

export type SignPropsType = {
  email: string;
  password: string;
};

export type UserProfileType = {
  userId: string;
  data?: Partial<MyUserType>;
};

export type UserPasswordUpdateType = {
  newPassword: string;
};

export type AuthStateType = {
  user: MyUserType | null;
  isLoading: string | null;
  isAuthenticated: boolean;
};
export interface ProfileProps {
  photo?: string;
  userName: string;
  birthday: string;
}

export type PlanType = 'monthly' | 'yearly';

export type TaskStatus = 'todo' | 'inprogress' | 'done';

export type TagType = 'task' | 'bug';

export type Task = {
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

export type TaskForm = {
  title: string;
  description: string;
  tag: TagType;
  attachment?: {
    fileUrl?: string | null;
    fileType?: string | null;
  };
};

export type TaskState = {
  tasks: Task[];
};

export type Columns = {
  label: string;
  value: string;
};

export type TaskFiltersState = {
  tag: string | null;
  date: {
    from: string | null;
    to: string | null;
  };
};

export type SortOrder = 'asc' | 'desc';

export type UserState = {
  users: MyUserType[];
  sortOrder: SortOrder;
};
export type chatsState = {
  chats: ChatsType[];
};

export type UserFiltersState = {
  status: string | null;
  createdAt: {
    from: string | null;
    to: string | null;
  };
};
export type ChatFiltersState = {
  updatedAt: {
    from: string | null;
    to: string | null;
  };
};

export type ChatMessage = {
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

export type ChatContextType = {
  messages: ChatMessage[];
  chatId: string | null;
};

export type ChatMessageType = {
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

export type ChatUserType = {
  email: string;
  photo: string;
  status: boolean;
  userId: string;
  username: string;
};

export type ChatsType = {
  id: string;
  message: ChatMessageType;
  user: ChatUserType;
};

export type ModalProps = React.PropsWithChildren & {
  open: boolean;
  handleClose: () => void;
  handleOpenModal?: (modalNumber: number) => void;
};

export type EditorContextType = {
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

export type FileUploaderType = {
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
