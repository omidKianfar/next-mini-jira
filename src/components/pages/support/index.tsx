"use client";

import { useEffect } from "react";

// hooks
import { useChat } from "@/src/hooks/chat/use-chat";
import { useAuth } from "@/src/hooks/auth/use-auth";

// firestore
import { MessgesRead } from "@/src/libs/chat/message-read";

// ui
import ChatMessages from "../../organisms/chat-messages";
import ChatInput from "../../molecule/chat/chat-input";

// type
import { UserType } from "@/src/types/global";

const SupportComponent = () => {
  // hooks
  const chat = useChat();
  const { user } = useAuth();

  // states
  const isAdmin = user?.userType == UserType.Admin;

  // functions
  useEffect(() => {
    MessgesRead({
      chatId: !isAdmin ? (user?.userId as string) : (chat.chatId as string),
      senderType: !isAdmin ? UserType.Admin : UserType.Client,
    });
  }, [chat]);

  if (!chat) {
    throw new Error("ChatContext is not available!");
  }

  return (
    <div
      className={`relative h-[calc(100vh-130px)] w-full rounded-md border-2 border-warning-400 bg-white`}
    >
      <ChatMessages messages={chat.messages} />

      <ChatInput />
    </div>
  );
};

export default SupportComponent;
