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
