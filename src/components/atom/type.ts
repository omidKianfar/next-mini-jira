import { IconName } from './icon-components/icons';

interface FarmerMotionProps {
  children: React.ReactNode;
}

type ButtonType = 'button' | 'submit' | 'reset';
interface ButtonProps {
  type?: ButtonType;
  children?: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
  disable?: boolean;
  icon?: React.ReactNode;
}
interface BackButtonProps {
  onClick: () => void;
}
interface LoadingProps {
  color?: string;
  size?: number;
}
interface MyIconProps {
  onClick?: () => void;
  className?: string;
  icon: IconName;
  iconClass?: string;
}
interface MyImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  wrapperClass?: string;
  onClick?: () => void;
}
interface LogoProps {
  small?: boolean;
}
interface MyVideoProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export type {
  FarmerMotionProps,
  ButtonType,
  ButtonProps,
  BackButtonProps,
  LoadingProps,
  MyIconProps,
  MyImageProps,
  LogoProps,
  MyVideoProps,
};
