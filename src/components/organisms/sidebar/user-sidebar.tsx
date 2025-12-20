import { useMemo } from "react";

// hooks
import { useNavigation } from "@/src/hooks/navigation";
import { useAuth } from "@/src/hooks/auth/use-auth";

// type
import { sidebarItemsType, sidebarProps } from "../type";

// ui
import MyIcon from "../../atom/icon";
import SidebarItem from "./sidebar-item";
import { UserType } from "@/src/types/global";

const UserSidebar = ({
  user,
  setShowSidebar,
}: Pick<sidebarProps, "setShowSidebar" | "user">) => {
  // ui
  const navigation = useNavigation();
  const { logout } = useAuth();

  // client sidebar items
  const userSidebarItems = useMemo<sidebarItemsType[]>(
    () => [
      {
        id: "profile",
        icon: "gg:profile",
        title: "profile",
        direction: () => {
          navigation.profile();
          setShowSidebar(false);
        },
        notification: { type: "none" },
      },
      {
        id: "dashboard",
        icon: "material-symbols:dashboard-rounded",
        title: "dashboard",
        direction: () => {
          navigation.dashboard();
          setShowSidebar(false);
        },
        notification: { type: "none" },
      },
      {
        id: "payment",
        icon: "fluent:payment-16-filled",
        title: "payment",
        direction: () => {
          navigation.payment();
          setShowSidebar(false);
        },
        notification: { type: "none" },
      },
    ],
    [navigation, setShowSidebar],
  );

  // admin sidebar items
  const AdminSidebarItems = useMemo<sidebarItemsType[]>(
    () => [
      {
        id: "adminProfile",
        icon: "gg:profile",
        title: "profile",
        direction: () => {
          navigation.adminProfile();
          setShowSidebar(false);
        },
        notification: { type: "none" },
      },
      {
        id: "adminDashboard",
        icon: "material-symbols:dashboard-rounded",
        title: "dashboard",
        direction: () => {
          navigation.adminDashboard();
          setShowSidebar(false);
        },
        notification: { type: "none" },
      },
    ],
    [navigation, setShowSidebar],
  );

  return (
    <div className="mt-6 flex flex-col items-start justify-center">
      <div className="h-[45vh] overflow-y-auto">
        {user?.userType === UserType?.Client
          ? userSidebarItems?.map((item: sidebarItemsType) => (
              <div key={item.id} className="mb-4">
                <SidebarItem item={item} />
              </div>
            ))
          : AdminSidebarItems?.map((item: sidebarItemsType) => (
              <div key={item.id} className="mb-4">
                <SidebarItem item={item} />
              </div>
            ))}
      </div>

      <hr className="mt-6 w-[190px] border border-dotted border-gray-300" />

      <div
        className="relative flex w-full cursor-pointer items-center justify-center pt-4 text-primary-700 hover:text-warning-600"
        onClick={logout}
      >
        <MyIcon icon={"tabler:logout"} className="mr-1 text-title" />

        <p className="text-[16px] font-semibold capitalize">Logout</p>
      </div>
    </div>
  );
};

export default UserSidebar;
