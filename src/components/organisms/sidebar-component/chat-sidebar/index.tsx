'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';

// ui
import AdminSupportUserCard from '@/src/components/molecule/cards/admin-support-user-card';
import PageLoading from '@/src/components/common/page-loading';

// type
import { chatSidebarProps } from '../../type';

// hook
import { useChatsListener } from '@/src/hooks/chat/use-user-listener';

const ChatSidebar = ({
  setShowSidebar,
}: Pick<chatSidebarProps, 'setShowSidebar'>) => {
  // redux
  const chats = useSelector((state: RootState) => state.chats.chats);
  const chatsFilters = useSelector((state: RootState) => state.chatsFilters);

  // functions
  useChatsListener();

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
    <div className="h-full w-full">
      {finalChats.map((chat) => (
        <div key={chat.id} className="mb-4">
          <AdminSupportUserCard chat={chat} setShowSidebar={setShowSidebar} />
        </div>
      ))}
    </div>
  );
};

export default ChatSidebar;
