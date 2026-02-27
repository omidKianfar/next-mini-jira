// ui
import { Icon } from '@iconify/react';
import { ICONS } from './icons';

// type
import { MyIconProps } from '../type';

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
