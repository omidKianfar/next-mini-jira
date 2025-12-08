import { Icon } from "@iconify/react";
import { MyIconProps } from "../type";

const MyIcon = ({ onClick, className, icon, iconClass }: MyIconProps) => {
  return (
    <div
      className={`flex justify-center items-center ${className}`}
      onClick={onClick}
    >
      <Icon icon={icon} className={iconClass} />
    </div>
  );
};

export default MyIcon;
