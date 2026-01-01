// ui
import MyIcon from "../../../atom/icon-components";

// type
import { SidebarItemProps } from "../../type";

const SidebarActionItem = ({ item }: SidebarItemProps) => {
  return (
    <div
      className="relative flex cursor-pointer items-center justify-start text-primary-700 hover:text-warning-600"
      onClick={item.direction}
    >
      <MyIcon icon={item.icon} className="mr-1 text-title" />

      <p className="text-[16px] font-semibold capitalize">{item.title}</p>

      {item.notification?.type === "count" && (
        <div className="absolute right-0 top-0 text-subtitle font-semibold text-warning-500">
          {item.notification.value}
        </div>
      )}

      {item.notification?.type === "dot" && (
        <div className="absolute right-0 top-0 text-subtitle text-warning-500" />
      )}
    </div>
  );
};

export default SidebarActionItem;
