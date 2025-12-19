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
export interface LoadingProps {
  color?: string;
  size?: number;
}
export interface MyIconProps {
  onClick?: () => void;
  className?: string;
  icon: string;
  iconClass?: string;
}
export interface MyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  wrapperClass?: string;
  onClick?: () => void;
}
export interface LogoProps {
  small?: boolean;
}
export interface MyVideoProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}
