import { HeaderProps, MyUserType } from '@/src/types/global';

type SidebarNotification =
  | { type: 'none' }
  | { type: 'count'; value: number }
  | { type: 'dot' };

type sidebarItemsType = {
  id: string;
  icon: string;
  title: string;
  direction: () => void | Promise<void>;
  notification?: SidebarNotification;
};

interface sidebarProps extends HeaderProps {
  user?: MyUserType | null;
}

export type { SidebarNotification, sidebarItemsType, sidebarProps };
