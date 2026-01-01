import { ChatMessage } from "@/src/types/global";
import { RefObject } from "react";
import { FieldValues, Path } from "react-hook-form";

export interface BaseControllerProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  className?: string;
}
export interface InputControllerProps<T extends FieldValues>
  extends BaseControllerProps<T> {
  type?: string;
  ref?: RefObject<HTMLInputElement | null>;
  autoFocus?: boolean;
  icon?: React.ReactNode;
  autoComplete?: string;
  disabled?: boolean;
}
export interface FileInputControllerProps<T extends FieldValues>
  extends BaseControllerProps<T> {
  ref?: RefObject<HTMLInputElement | null>;
  onChange?: (event: any) => void;
  disabled?: boolean;
  accept?: string;
}

export type TextareaControllerProps<T extends FieldValues> =
  BaseControllerProps<T> & {
    rows?: number;
  };
export interface SelectOption {
  label: string;
  value: string | number;
}
export interface SelectControllerProps<T extends FieldValues>
  extends BaseControllerProps<T> {
  options: SelectOption[];
}

export type DateInputFieldProps<T extends FieldValues> = BaseControllerProps<T>;
export interface ErrorProps {
  errors: any;
}

export interface UploadAvatarProps {
  photo: string | undefined;
  uploadHandler: (event: any) => void;
  uploading?: boolean;
  progress?: number;
}

export type CartType = {
  title: string;
  description: string;
  onClick: () => void;
  price?: number;
  icon: React.ReactNode;
};
export interface ChatMessageItemProps {
  message: ChatMessage;
}
