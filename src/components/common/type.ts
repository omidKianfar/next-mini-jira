import { ReactNode } from "react";

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}
export interface ErrorBoundaryState {
  hasError: boolean;
}
export interface LightBoxProps {
  children: React.ReactNode;
  url: string;
}
export type ModalProps = React.PropsWithChildren & {
  open: boolean;
  handleClose: () => void;
  handleOpenModal?: (modalNumber: number) => void;
};
export interface CropProps {
  file: never;
  onCancel: () => void;
  onSave: (file: File) => void | Promise<void>;
}
