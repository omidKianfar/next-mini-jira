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
  onChange?: (event: any) => void;
  autoFocus?: boolean;
  autoComplete?: string;
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
