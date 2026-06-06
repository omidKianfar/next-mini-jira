'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/src/hooks/auth/use-auth';
import { useUnreadCount } from '@/src/hooks/chat/use-unread-count';
import { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';
import { AdminUnreadMeassesListener } from '@/src/libs/chat/admin-unread-messages-count';
import { HeaderProps, UserType } from '@/src/types/global';
import MyIcon from '../../atom/icon-components';

const LeftSideHeaders = ({ showSidebar, setShowSidebar }: HeaderProps) => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { user } = useAuth();

  const userUnreadCount = useUnreadCount({
    chatId: user?.userId as string,
    senderType: UserType.Admin,
  });

  const adminUnreadCount = AdminUnreadMeassesListener();

  const isPublicPage =
    pathname === '/' || pathname === '/about' || pathname === '/contact';

  const shouldShowBadge =
    (user?.userType === UserType.Client && userUnreadCount > 0) ||
    (user?.userType === UserType.Admin && adminUnreadCount > 0);

  return (
    <div className="relative flex w-1/3 items-center justify-start">
      {isPublicPage && !isMobile ? (
        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className="text-body font-medium text-primary-500 transition-colors hover:text-warning-500"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="text-body font-medium text-primary-500 transition-colors hover:text-warning-500"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-body font-medium text-primary-500 transition-colors hover:text-warning-500"
          >
            Contact
          </Link>
        </nav>
      ) : (
        <>
          <MyIcon
            icon="menu"
            className="cursor-pointer text-title text-primary-500 transition-colors hover:text-primary-700 lg:text-h3"
            onClick={() => setShowSidebar?.(!showSidebar)}
          />

          {shouldShowBadge && (
            <div className="absolute left-0 top-0 h-[10px] w-[10px] animate-pulse rounded-full bg-warning-500" />
          )}
        </>
      )}
    </div>
  );
};

export default LeftSideHeaders;
