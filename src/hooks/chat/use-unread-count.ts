import { useState, useEffect } from "react";
import { SetStateAction } from "react";

// fiestore
import { userUnreadCountListener } from "@/src/libs/chat/get-user-unread-messages-count";

// type
import { useUnreadCountProps } from "../type";

export const useUnreadCount = ({ chatId, senderType }: useUnreadCountProps) => {
  // states
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!chatId) {
      return;
    }

    const unsubscribe = userUnreadCountListener({
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
