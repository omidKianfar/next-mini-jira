"use client";

import { ButtonProps } from "../type";
import { ButtonLoading } from "../imports";

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
          <ButtonLoading size={20} color="currentColor" />
        </span>
      )}
    </button>
  );
};

export default ButtonFreeClass;
