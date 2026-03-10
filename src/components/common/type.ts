import { ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}
interface LightBoxProps {
  children: React.ReactNode;
  url: string;
}
interface CropProps {
  file: never;
  onCancel: () => void;
  onSave: (file: File) => void | Promise<void>;
}

export type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
  LightBoxProps,
  CropProps,
};
