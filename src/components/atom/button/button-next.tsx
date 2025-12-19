"use client";

// ui
import LoadingCircle from "../loading-circle";

// type
import { ButtonProps } from "../type";

const ButtonNext = ({
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
      className={`flex cursor-pointer items-center justify-center rounded-lg border-2 bg-primary-500 px-8 py-2 text-body text-white transition-all duration-200 hover:border-primary-500 hover:bg-transparent hover:text-primary-500 disabled:cursor-not-allowed disabled:opacity-60 ${className} `}
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

export default ButtonNext;
