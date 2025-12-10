"use client";

import { BackButtonProps } from "../type";
import { ButtonFreeClass, MyIcon } from "../imports";

const ButtonBack = ({ onClick }: BackButtonProps) => {
  return (
    <ButtonFreeClass
      onClick={onClick}
      className="text-warning-500 hover:text-warning-600"
      icon={
        <MyIcon
          icon="grommet-icons:link-next"
          className="rotate-180 text-title"
        />
      }
    ></ButtonFreeClass>
  );
};

export default ButtonBack;
