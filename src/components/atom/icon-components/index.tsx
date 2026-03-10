import { Icon } from '../imports';
import { ICONS } from './icons';
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
