"use client";

// ui
import ButtonFreeClass from "./button-free-class";
import MyIcon from "../icon-components";

// type
import { BackButtonProps } from "../type";

const ButtonBack = ({ onClick }: BackButtonProps) => {
  return (
    <ButtonFreeClass
      onClick={onClick}
      className="text-warning-500 hover:text-warning-600"
      icon={<MyIcon icon="maki:arrow" className="rotate-180 text-title" />}
    ></ButtonFreeClass>
  );
};

export default ButtonBack;
