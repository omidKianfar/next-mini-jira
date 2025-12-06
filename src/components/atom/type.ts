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


export interface FarmerMotionProps {
  children: React.ReactNode;
}


export type ButtonType = "button" | "submit" | "reset";

export interface ButtonProps {
  type: ButtonType;
  children: React.ReactNode;
  isLoading: boolean;
  onClick?: () => void;
  className?: string;
  disable?: boolean;
  icon?: React.ReactNode;
}

export interface BackButtonProps {
  onClick: () => void;
}

export type FilterFormType = {
  tag: string;
  from?: string ;
  to?: string ;
};

export interface LoadingProps {
  color: string;
  size: number;
}

export type ModalProps = React.PropsWithChildren & {
  open: boolean;
  handleClose: () => void;
};

export interface StringSlicerProps {
  string: string;
  slice: number;
}

export interface UploadAvatarProps {
  photo: string | undefined;
  uploadHandler: (event: any) => void;
}
