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

export interface CropProps {
  file: never;
  onCancel: () => void;
  onSave: (file: File) => void | Promise<void>;
}
