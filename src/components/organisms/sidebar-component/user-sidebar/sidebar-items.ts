import { useMemo } from "react";
import { sidebarItemsType, sidebarProps } from "../../type";
import { useNavigation } from "@/src/hooks/navigation/use-navigation";
import { useUnreadCount } from "@/src/hooks/chat/use-unread-count";
import { useAdminTotalUnreadCount } from "@/src/libs/chat/admin-unread-message-listener";
import { UserType } from "@/src/types/global";
import { MessgesRead } from "@/src/libs/chat/message-read";

export const SidebarItems = ({
  user,
  setShowSidebar,
}: Pick<sidebarProps, "setShowSidebar" | "user">) => {
  // hooks
  const navigation = useNavigation();

  // user unread message
  const UserUnreadCount = useUnreadCount({
    chatId: user?.userId as string,
    senderType: UserType.Admin,
  });

  // admin unread count
  const AdminUnraedCount = useAdminTotalUnreadCount();

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
        id: "support",
        icon: "bx:support",
        title: "Support",
        direction: () => {
          MessgesRead({
            chatId: user?.userId as string,
            senderType: UserType.Admin,
          });

          navigation.support();
          setShowSidebar(false);
        },
        notification:
          UserUnreadCount > 0
            ? { type: "count", value: UserUnreadCount }
            : { type: "none" },
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
    [navigation, setShowSidebar, UserUnreadCount],
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
      {
        id: "support",
        icon: "bx:support",
        title: "Support",
        direction: () => {
          navigation.adminSupport();
          setShowSidebar(false);
        },
        notification:
          AdminUnraedCount > 0
            ? { type: "count", value: AdminUnraedCount }
            : { type: "none" },
      },
    ],
    [navigation, setShowSidebar, AdminUnraedCount],
  );

  return { userSidebarItems, AdminSidebarItems };
};
