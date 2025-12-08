"use client";

import { BackButtonProps } from "../type";
import { Button, MyIcon } from "../imports";

const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="text-amber-500 hover:text-amber-600"
      icon={
        <MyIcon
          icon="grommet-icons:link-next"
          className="text-[24px] rotate-180"
        />
      }
    ></Button>
  );
};

export default BackButton;
