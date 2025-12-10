import { Icon } from "@iconify/react";
import { MyIconProps } from "../type";

const MyIcon = ({ onClick, className, icon, iconClass }: MyIconProps) => {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      <Icon icon={icon} className={iconClass} />
    </div>
  );
};

export default MyIcon;
