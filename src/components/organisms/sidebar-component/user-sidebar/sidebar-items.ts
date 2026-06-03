import { useMemo } from 'react';
import { useNavigation } from '@/src/hooks/navigation/use-navigation';
import { useUnreadCount } from '@/src/hooks/chat/use-unread-count';
import { AdminUnreadMeassesListener } from '@/src/libs/chat/admin-unread-messages-count';
import { MessgesRead } from '@/src/libs/chat/read-message';
import { UserType } from '@/src/types/global';
import { sidebarItemsType, sidebarProps } from './type';

export const SidebarItems = ({
  user,
  setShowSidebar,
}: Pick<sidebarProps, 'setShowSidebar' | 'user'>) => {
  const navigation = useNavigation();

  const UserUnreadCount = useUnreadCount({
    chatId: user?.userId as string,
    senderType: UserType?.Admin,
  });

  const AdminUnraedCount = AdminUnreadMeassesListener();

  const LandingSidebarItems = useMemo<sidebarItemsType[]>(() => {
    const items: sidebarItemsType[] = [
      {
        id: 'home',
        icon: 'home',
        title: 'home',
        direction: () => {
          navigation.landing();
          setShowSidebar?.(false);
        },
        notification: { type: 'none' },
      },
      {
        id: 'profile',
        icon: 'profile',
        title: 'profile',
        direction: () => {
          user?.userType === UserType.Admin
            ? navigation.adminProfile()
            : navigation.profile();

          setShowSidebar?.(false);
        },
        notification: { type: 'none' },
      },
      {
        id: 'dashboard',
        icon: 'dashboard',
        title: 'dashboard',
        direction: () => {
          user?.userType === UserType.Admin
            ? navigation.adminDashboard()
            : navigation.dashboard();

          setShowSidebar?.(false);
        },
        notification: { type: 'none' },
      },
      {
        id: 'about',
        icon: 'about',
        title: 'about',
        direction: () => {
          navigation.about();
          setShowSidebar?.(false);
        },
        notification: { type: 'none' },
      },
      {
        id: 'contact',
        icon: 'contact',
        title: 'contact',
        direction: () => {
          navigation.contact();
          setShowSidebar?.(false);
        },
        notification: { type: 'none' },
      },
    ];

    if (
      !user?.userType ||
      (user?.userType !== UserType.Client && user?.userType !== UserType.Admin)
    ) {
      return items.filter(
        (item) => item.id !== 'profile' && item.id !== 'dashboard'
      );
    }

    return items;
  }, [navigation, setShowSidebar, user?.userType]);

  const userSidebarItems = useMemo<sidebarItemsType[]>(
    () => [
      {
        id: 'home',
        icon: 'home',
        title: 'home',
        direction: () => {
          navigation.landing();
          setShowSidebar?.(false);
        },
        notification: { type: 'none' },
      },
      {
        id: 'profile',
        icon: 'profile',
        title: 'profile',
        direction: () => {
          navigation.profile();
          setShowSidebar?.(false);
        },
        notification: { type: 'none' },
      },
      {
        id: 'dashboard',
        icon: 'dashboard',
        title: 'dashboard',
        direction: () => {
          navigation.dashboard();
          setShowSidebar?.(false);
        },
        notification: { type: 'none' },
      },
      {
        id: 'support',
        icon: 'support',
        title: 'Support',
        direction: () => {
          MessgesRead({
            chatId: user?.userId as string,
            senderType: UserType.Admin,
          });

          navigation.support();
          setShowSidebar?.(false);
        },
        notification:
          UserUnreadCount > 0
            ? { type: 'count', value: UserUnreadCount }
            : { type: 'none' },
      },
      {
        id: 'payment',
        icon: 'payment',
        title: 'payment',
        direction: () => {
          navigation.payment();
          setShowSidebar?.(false);
        },
        notification: { type: 'none' },
      },
    ],
    [navigation, setShowSidebar, UserUnreadCount]
  );

  const AdminSidebarItems = useMemo<sidebarItemsType[]>(
    () => [
      {
        id: 'home',
        icon: 'home',
        title: 'home',
        direction: () => {
          navigation.landing();
          setShowSidebar?.(false);
        },
        notification: { type: 'none' },
      },
      {
        id: 'adminProfile',
        icon: 'profile',
        title: 'profile',
        direction: () => {
          navigation.adminProfile();
          setShowSidebar?.(false);
        },
        notification: { type: 'none' },
      },
      {
        id: 'adminDashboard',
        icon: 'dashboard',
        title: 'dashboard',
        direction: () => {
          navigation.adminDashboard();
          setShowSidebar?.(false);
        },
        notification: { type: 'none' },
      },
      {
        id: 'support',
        icon: 'support',
        title: 'Support',
        direction: () => {
          navigation.adminSupport();
          setShowSidebar?.(false);
        },
        notification:
          AdminUnraedCount > 0
            ? { type: 'count', value: AdminUnraedCount }
            : { type: 'none' },
      },
    ],
    [navigation, setShowSidebar, AdminUnraedCount]
  );

  return { userSidebarItems, AdminSidebarItems, LandingSidebarItems };
};
