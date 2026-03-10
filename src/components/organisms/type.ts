import {
  ChatMessage,
  ChatsType,
  Dispatch,
  MyUserType,
  SetStateAction,
} from './imports';

interface AddTaskProps {
  handleClose: () => void;
  setNumber: Dispatch<SetStateAction<number>>;
  loading: boolean;
}
interface AddTaskUploadProps {
  uploadProcessHandler: (file: File) => Promise<void>;
  handleCancel: () => void;
  handleSave: () => void;
  progress?: number;
  uploading?: boolean;
  error?: string | null;
  fileType?: string | null;
  url?: string | null;
  isCompressing?: boolean;
  compressionProgress?: number;
}
interface HeaderProps {
  showSidebar?: boolean;
  setShowSidebar?: Dispatch<SetStateAction<boolean>>;
}
interface sidebarProps extends HeaderProps {
  user?: MyUserType | null;
}
interface chatSidebarProps extends HeaderProps {
  chat: ChatsType;
}

type SidebarNotification =
  | { type: 'none' }
  | { type: 'count'; value: number }
  | { type: 'dot' };

type sidebarItemsType = {
  id: string;
  icon: string;
  title: string;
  direction: () => void | Promise<void>;
  notification?: SidebarNotification;
};
interface SidebarItemProps {
  item: sidebarItemsType;
}

type CellContent<T> =
  | string
  | number
  | React.ReactNode
  | ((row: T) => React.ReactNode);

type Column<T> = {
  key?: string;
  head: CellContent<T>;
  column: CellContent<T>;
  className?: string;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
};

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};
interface ListComponentProps {
  children: React.ReactNode;
  title?: string;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
  showMenu?: boolean;
  handleTemplateSelect?: (text: string) => void;
  editMessageId?: string | null;
  setEditMessageId?: Dispatch<SetStateAction<string | null>>;
  userChat?: MyUserType | null;
}

interface UsersTableProps {
  users: MyUserType[];
  goDetail: (userId: string) => void;
  toggleActive: (user: MyUserType) => Promise<void>;
}

type UsersFilterFormType = {
  status: string;
  from?: string;
  to?: string;
};
type ChatsFilterFormType = {
  from?: string;
  to?: string;
};

type TasksFilterFormType = {
  tag: string;
  from?: string;
  to?: string;
};

export type {
  AddTaskProps,
  AddTaskUploadProps,
  HeaderProps,
  sidebarProps,
  chatSidebarProps,
  SidebarNotification,
  sidebarItemsType,
  SidebarItemProps,
  CellContent,
  Column,
  TableProps,
  PaginationProps,
  ListComponentProps,
  ChatMessagesProps,
  UsersTableProps,
  UsersFilterFormType,
  ChatsFilterFormType,
  TasksFilterFormType,
};
