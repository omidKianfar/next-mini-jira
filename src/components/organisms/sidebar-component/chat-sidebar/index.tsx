"use client";

import { useEffect, useState } from "react";

// ui
import AdminSupportUserCard from "@/src/components/molecule/cards/admin-support-user-card";

// firestore
import { ChatsListener } from "@/src/libs/chat/chats-listener";

// type
import { ChatsType } from "@/src/types/global";
import { chatSidebarProps } from "../../type";

const ChatSidebar = ({
  setShowSidebar,
}: Pick<chatSidebarProps, "setShowSidebar">) => {
  // states
  const [chats, setChats] = useState<ChatsType[]>([]);

  // functions
  useEffect(() => {
    const unsub = ChatsListener({
      callback: (data: ChatsType[]) => {
        setChats(data);
      },
    });

    return () => unsub();
  }, []);

  return (
    <div className="h-full w-full">
      {chats.map((chat) => (
        <div key={chat.id} className="mb-2">
          <AdminSupportUserCard chat={chat} setShowSidebar={setShowSidebar} />
        </div>
      ))}
    </div>
  );
};

export default ChatSidebar;
