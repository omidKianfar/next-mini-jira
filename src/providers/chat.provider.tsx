"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// type
import {
  ChatContextType,
  ChatMessage,
  MyUserType,
  UserType,
} from "../types/global";

// chat
import { ChatMessagesListener } from "../libs/chat/messages-listener";

// hooks
import { useAuth } from "../hooks/auth/use-auth";
import { useUserListenerById } from "../hooks/users/use-user-listener-by-id";

// create context
export const ChatContext = createContext<ChatContextType | undefined>(
  undefined,
);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  // hooks
  const pathname = usePathname();
  const params = useSearchParams();
  const chatId = params.get("chatId");

  const { user: currentUser } = useAuth();
  const { user: userChat } = useUserListenerById(chatId);

  // states
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // functions
  useEffect(() => {
    if (!currentUser) return;

    const finalUser =
      currentUser?.userType === UserType.Admin &&
      pathname.includes("/admin/support/chat")
        ? (userChat as MyUserType)
        : (currentUser as MyUserType);

    const onReceive = (messages: ChatMessage[]) => {
      setMessages(messages);
    };

    const unsubscribeFirestore = ChatMessagesListener({
      user: finalUser,
      onReceive: onReceive,
    });

    return () => unsubscribeFirestore();
  }, [currentUser, userChat]);

  return (
    <ChatContext.Provider value={{ messages, chatId }}>
      {children}
    </ChatContext.Provider>
  );
};
