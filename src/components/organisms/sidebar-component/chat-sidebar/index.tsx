"use client";

import { useEffect, useState } from "react";

// ui
import AdminSupportUserCard from "@/src/components/molecule/cards/admin-support-user-card";

// firestore
import { ChatsListener } from "@/src/libs/chat/chats-listener";

// type
import { ChatsType } from "@/src/types/global";

const ChatSidebar = ({
  setSidebarShow,
}: {
  setSidebarShow: (show: boolean) => void;
}) => {
  // hooks
  const [chats, setChats] = useState<ChatsType[]>([]);
  console.log("chats", chats);

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
    <div className="h-full w-[85vw] lg:w-[300px]">
      {chats.map((chat) => (
        <div key={chat.id} className="mb-2">
          <AdminSupportUserCard chat={chat} setSidebarShow={setSidebarShow} />
        </div>
      ))}
    </div>
  );
};

export default ChatSidebar;
