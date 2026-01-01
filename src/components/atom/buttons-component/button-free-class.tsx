"use client";

// ui
import LoadingCircle from "../loadings/loading-circle";

// type
import { ButtonProps } from "../type";

const ButtonFreeClass = ({
  type = "button",
  children,
  isLoading = false,
  onClick,
  className = "",
  disable = false,
  icon,
}: Partial<ButtonProps>) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disable}
      className={`flex cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-60 ${className} `}
    >
      {children}
      {icon ? icon : null}
      {isLoading && (
        <span className="ml-2 flex items-center justify-center">
          <LoadingCircle size={20} color="currentColor" />
        </span>
      )}
    </button>
  );
};

export default ButtonFreeClass;
