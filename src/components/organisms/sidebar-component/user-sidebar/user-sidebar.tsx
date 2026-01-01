// hooks
import { useAuth } from "@/src/hooks/auth/use-auth";

// type
import { sidebarItemsType, sidebarProps } from "../../type";
import { UserType } from "@/src/types/global";

// ui
import MyIcon from "../../../atom/icon-components";
import { SidebarItems } from "./sidebar-items";
import SidebarActionItem from "./sidebar-action-item";
import ButtonFreeClass from "@/src/components/atom/buttons-component/button-free-class";

const UserSidebar = ({
  user,
  setShowSidebar,
}: Pick<sidebarProps, "setShowSidebar" | "user">) => {
  // hooks
  const { logout } = useAuth();

  const { userSidebarItems, AdminSidebarItems } = SidebarItems({
    user,
    setShowSidebar,
  });

  return (
    <div className="mt-6 flex flex-col items-start justify-center">
      <div className="h-[45vh] overflow-y-auto">
        {user?.userType === UserType?.Client
          ? userSidebarItems?.map((item: sidebarItemsType) => (
              <div key={item.id} className="mb-4">
                <SidebarActionItem item={item} />
              </div>
            ))
          : AdminSidebarItems?.map((item: sidebarItemsType) => (
              <div key={item.id} className="mb-4">
                <SidebarActionItem item={item} />
              </div>
            ))}
      </div>

      <hr className="mt-6 w-[190px] border border-dashed border-gray-300" />

      <div className="flex w-full items-center justify-center pt-4">
        <ButtonFreeClass
          className="cursor-pointer text-[16px] font-semibold text-primary-700 hover:text-warning-600"
          onClick={logout}
          icon={<MyIcon icon={"tabler:logout"} className="mr-1 text-title" />}
        >
          Logout
        </ButtonFreeClass>
      </div>
    </div>
  );
};

export default UserSidebar;
