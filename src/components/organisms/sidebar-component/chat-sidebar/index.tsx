'use client';

import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import { useChatsListener } from '@/src/hooks/chat/use-user-listener';
import ButtonFreeClass from '@/src/components/atom/buttons-component/button-free-class';
import MyIcon from '@/src/components/atom/icon-components';
import PageLoading from '@/src/components/common/page-loading';
import { chatSidebarProps } from '@/src/types/global';
import SupportUserCardSkeleton from '@/src/components/molecule/skeleton/support-user-card-skeleton';

const AdminSupportUserCard = lazy(
  () => import('@/src/components/molecule/cards/admin-support-user-card')
);

const ChatSidebar = ({
  setShowSidebar,
}: Pick<chatSidebarProps, 'setShowSidebar'>) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [showScrollBtn, setShowScrollBtn] = useState<boolean>(false);

  const chats = useSelector((state: RootState) => state?.chats?.chats);
  const chatsFilters = useSelector((state: RootState) => state?.chatsFilters);

  useChatsListener();

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop } = container;
      setShowScrollBtn(scrollTop > 200);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const finalChats = chats.filter((chat) => {
    const messageUpdatedAt = chat.message.updatedAt;
    const { updatedAt } = chatsFilters;

    if (!messageUpdatedAt) return false;
    if (updatedAt.from && messageUpdatedAt < updatedAt.from) return false;
    if (updatedAt.to && messageUpdatedAt > updatedAt.to) return false;

    return true;
  });

  if (!finalChats) return <PageLoading />;

  return (
    <div className="relative h-full w-full">
      <div className="h-full w-full">
        {finalChats.map((chat) => (
          <div key={chat.id} className="mb-4">
            <Suspense fallback={<SupportUserCardSkeleton />}>
              <AdminSupportUserCard
                chat={chat}
                setShowSidebar={setShowSidebar}
              />
            </Suspense>
          </div>
        ))}
      </div>

      {showScrollBtn && (
        <ButtonFreeClass
          onClick={scrollToTop}
          className="z-9 absolute right-0 top-0"
          icon={
            <MyIcon
              icon="scroll-down"
              className="rotate-180 text-h3 text-primary-500/50 hover:text-primary-700"
            />
          }
        ></ButtonFreeClass>
      )}
    </div>
  );
};

export default ChatSidebar;
