import { Dispatch, SetStateAction } from "react";

// type
import { MyUserType } from "@/src/types/global";
export interface AddTaskProps {
  handleClose: () => void;
  setNumber: Dispatch<SetStateAction<number>>;
  loading: boolean;
}
export interface AddTaskUploadProps {
  uploadProcessHandler: (file: File) => Promise<void>;
  handleCancel: () => void;
  handleSave: () => void;
  progress?: number;
  uploading?: boolean;
  error?: string | null;
  fileType?: string | null;
  url?: string | null;
}
export interface HeaderProps {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}
export interface sidebarProps extends HeaderProps {
  user?: MyUserType | null;
}

export type SidebarNotification =
  | { type: "none" }
  | { type: "count"; value: number }
  | { type: "dot" };

export type sidebarItemsType = {
  id: string;
  icon: string;
  title: string;
  direction: () => void | Promise<void>;
  notification?: SidebarNotification;
};
export interface SidebarItemProps {
  item: sidebarItemsType;
}
