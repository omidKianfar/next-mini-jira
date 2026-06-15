import { SetStateAction, useEffect, useState } from 'react';
import { userUnreadMessagesListener } from '@/src/libs/chat/user-unread-messages-listener';
import { UserType } from '@/src/types/global';

interface useUnreadCountProps {
  chatId: string;
  senderType: UserType;
}

export const useUnreadCount = ({ chatId, senderType }: useUnreadCountProps) => {
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    if (!chatId) {
      return;
    }

    const unsubscribe = userUnreadMessagesListener({
      chatId: chatId,
      senderType: senderType,
      callback: (count: number) => {
        setUnreadCount(count);
      },
    });

    return () => {
      unsubscribe();
      setUnreadCount(0 as SetStateAction<number>);
    };
  }, [chatId]);

  return unreadCount;
};
