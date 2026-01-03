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
import { usePathname } from "next/navigation";

const SupportComponent = () => {
  // hooks
  const pathname = usePathname();
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
      className={`relative ${pathname.includes("admin") ? "h-[calc(100vh-150px)]" : "h-[calc(100vh-90px)]"} w-full rounded-md border-2 border-warning-400 bg-white shadow-md lg:h-[calc(100vh-110px)]`}
    >
      <ChatMessages messages={chat.messages} />

      <ChatInput />
    </div>
  );
};

export default SupportComponent;
