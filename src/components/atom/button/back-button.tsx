"use client";

import { BackButtonProps } from "../type";
import { Button, Icon } from "../imports";

const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="text-amber-500 hover:text-amber-600"
      icon={
        <Icon
          icon="grommet-icons:link-next"
          width={24}
          className=" rotate-180"
        />
      }
    ></Button>
  );
};

export default BackButton;
