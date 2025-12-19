import MyIcon from "../../atom/icon";
import { SidebarItemProps } from "../type";

const SidebarItems = ({ item }: SidebarItemProps) => {
  return (
    <div
      className="relative flex cursor-pointer items-center justify-start text-primary-700 hover:text-warning-600"
      onClick={item.direction}
    >
      <MyIcon icon={item.icon} className="mr-1 text-title" />

      <p className="text-[16px] capitalize font-semibold">{item.title}</p>

      {item.notification?.type === "count" && (
        <div className="absolute right-[-24px] top-0 text-subtitle font-semibold text-warning-500">
          {item.notification.value}
        </div>
      )}

      {item.notification?.type === "dot" && (
        <div className="absolute right-[-16px] top-0 text-label text-warning-500" />
      )}
    </div>
  );
};

export default SidebarItems;
