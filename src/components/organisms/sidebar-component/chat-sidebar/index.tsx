'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import { useEffect, useRef, useState } from 'react';

// ui
import AdminSupportUserCard from '@/src/components/molecule/cards/admin-support-user-card';
import PageLoading from '@/src/components/common/page-loading';
import ButtonFreeClass from '@/src/components/atom/buttons-component/button-free-class';
import MyIcon from '@/src/components/atom/icon-components';

// type
import { chatSidebarProps } from '../../type';

// hook
import { useChatsListener } from '@/src/hooks/chat/use-user-listener';

const ChatSidebar = ({
  setShowSidebar,
}: Pick<chatSidebarProps, 'setShowSidebar'>) => {
  // ref
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // state
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  // redux
  const chats = useSelector((state: RootState) => state.chats.chats);
  const chatsFilters = useSelector((state: RootState) => state.chatsFilters);

  // hook
  useChatsListener();

  // function
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

  // apply filters
  const finalChats = chats.filter((chat) => {
    const messageUpdatedAt = chat.message.updatedAt;
    const { updatedAt } = chatsFilters;

    if (!messageUpdatedAt) return false;

    // date filters
    if (updatedAt.from && messageUpdatedAt < updatedAt.from) return false;
    if (updatedAt.to && messageUpdatedAt > updatedAt.to) return false;

    return true;
  });

  // ui
  if (!finalChats) return <PageLoading />;

  return (
    <div className="relative h-full w-full">
      <div className="h-full w-full">
        {finalChats.map((chat) => (
          <div key={chat.id} className="mb-4">
            <AdminSupportUserCard chat={chat} setShowSidebar={setShowSidebar} />
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
