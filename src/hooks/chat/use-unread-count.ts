import { useState, useEffect } from "react";
import { SetStateAction } from "react";

// fiestore
import { userUnreadMessagesListener } from "@/src/libs/chat/user-unread-messages-listener";

// type
import { useUnreadCountProps } from "../type";

export const useUnreadCount = ({ chatId, senderType }: useUnreadCountProps) => {
  // states
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
