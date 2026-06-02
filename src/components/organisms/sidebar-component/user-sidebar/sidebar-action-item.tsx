import MyIcon from '@/src/components/atom/icon-components';
import { IconName } from '@/src/components/atom/icon-components/icons';
import { sidebarItemsType } from './type';

interface SidebarItemProps {
  item: sidebarItemsType;
}

const SidebarActionItem = ({ item }: SidebarItemProps) => {
  return (
    <div
      className="text-gary-800 relative flex w-full cursor-pointer items-center justify-start hover:text-primary-600"
      onClick={item.direction}
    >
      <MyIcon
        icon={item.icon as IconName}
        className="mr-1 text-title text-warning-500"
      />

      <p className="text-[16px] font-semibold capitalize">{item.title}</p>

      {item.notification?.type === 'count' && (
        <div className="absolute right-0 top-0 text-subtitle font-semibold text-warning-500">
          {item.notification.value}
        </div>
      )}

      {item.notification?.type === 'dot' && (
        <div className="absolute right-0 top-0 text-subtitle text-warning-500" />
      )}
    </div>
  );
};

export default SidebarActionItem;
