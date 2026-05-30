'use client';

import { ButtonType } from '@/src/types/global';
import LoadingCircle from '../loadings/loading-circle';

interface ButtonProps {
  type?: ButtonType;
  children?: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
  disable?: boolean;
  icon?: React.ReactNode;
}

const ButtonFreeClass = ({
  type = 'button',
  children,
  isLoading = false,
  onClick,
  className = '',
  disable = false,
  icon,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disable}
      className={`flex cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-60 ${className} `}
    >
      {children}
      {icon ?? icon}
      {isLoading && (
        <span className="ml-2 flex items-center justify-center">
          <LoadingCircle size={20} color="currentColor" />
        </span>
      )}
    </button>
  );
};

export default ButtonFreeClass;
