"use client";

// ui
import AdminSupportUserCard from "@/src/components/molecule/cards/admin-support-user-card";

// type
import { chatSidebarProps } from "../../type";
import { useChatsListener } from "@/src/hooks/chat/use-user-listener";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import PageLoading from "@/src/components/common/page-loading";
import { UserType } from "@/src/types/global";

const ChatSidebar = ({
  setShowSidebar,
}: Pick<chatSidebarProps, "setShowSidebar">) => {
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
