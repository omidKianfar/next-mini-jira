import { useAuth } from '@/src/hooks/auth/use-auth';
import { useUnreadCount } from '@/src/hooks/chat/use-unread-count';
import { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';
import { AdminUnreadMeassesListener } from '@/src/libs/chat/admin-unread-messages-count';
import { HeaderProps, UserType } from '@/src/types/global';
import { usePathname } from 'next/navigation';
import MyIcon from '../../atom/icon-components';
import Link from 'next/link';

const LeftSideHeaders = ({ showSidebar, setShowSidebar }: HeaderProps) => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { user } = useAuth();

  const UserUnreadCount = useUnreadCount({
    chatId: user?.userId as string,
    senderType: UserType.Admin,
  });

  const AdminUnraedCount = AdminUnreadMeassesListener();

  return (
    <div className="relative flex w-1/3 items-center justify-start">
      {(pathname === '/' || pathname === '/about' || pathname === '/contact') &&
      !isMobile ? (
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="text-body font-medium text-primary-500 hover:text-warning-500"
          >
            Contact
          </Link>

          <Link
            href="/about"
            className="text-body font-medium text-primary-500 hover:text-warning-500"
          >
            About
          </Link>
        </div>
      ) : (
        <MyIcon
          icon="menu"
          className="cursor-pointer text-title text-primary-500 hover:text-primary-700 lg:text-h3"
          onClick={() => setShowSidebar?.(!showSidebar)}
        />
      )}

      {user?.userType === UserType.Client && UserUnreadCount > 0 && (
        <div className="absolute left-0 top-0 h-[10px] w-[10px] rounded-full bg-warning-500"></div>
      )}

      {user?.userType === UserType.Admin && AdminUnraedCount > 0 && (
        <div className="absolute left-0 top-0 h-[10px] w-[10px] rounded-full bg-warning-500"></div>
      )}
    </div>
  );
};

export default LeftSideHeaders;
