import Button from "./next-button";
import { Icon } from "@iconify/react";
import { BackButtonProps } from "./type";

const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="text-amber-500 "
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
