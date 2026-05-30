import { IconName, ICONS } from './icons';
import { Icon } from '@iconify/react';

interface MyIconProps {
  onClick?: () => void;
  className?: string;
  icon: IconName;
  iconClass?: string;
}

const MyIcon = ({ onClick, className, icon, iconClass }: MyIconProps) => {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      <Icon icon={ICONS[icon]} className={iconClass} />
    </div>
  );
};

export default MyIcon;
