"use client";

import ButtonLoading from "../loading/button-loader";
import { ButtonProps } from "./type";

const Button = ({
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
      className={`
        flex justify-center items-center cursor-pointer
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
      {icon ? icon : null}
      {isLoading && (
        <span className="flex justify-center items-center ml-2">
          <ButtonLoading size={20} color="currentColor" />
        </span>
      )}
    </button>
  );
};

export default Button;
