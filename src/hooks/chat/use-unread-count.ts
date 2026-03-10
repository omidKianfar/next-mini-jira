import {
  useState,
  useEffect,
  userUnreadMessagesListener,
  SetStateAction,
} from '../imports';
import { useUnreadCountProps } from '../type';

export const useUnreadCount = ({ chatId, senderType }: useUnreadCountProps) => {
  const [unreadCount, setUnreadCount] = useState(0);

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
