// hooks
import { useUnreadCount } from "@/src/hooks/chat/use-unread-count";
import { useNavigation } from "@/src/hooks/navigation/use-navigation";

// firestore
import { MessgesRead } from "@/src/libs/chat/message-read";

// type
import { UserType } from "@/src/types/global";
import { chatSidebarProps } from "../../organisms/type";

const AdminSupportUserCard = ({
  chat,
  setShowSidebar,
}: Pick<chatSidebarProps, "chat" | "setShowSidebar">) => {
  // hooks
  const navigation = useNavigation();
  const unreadCount = useUnreadCount({
    chatId: chat.id,
    senderType: UserType.Client,
  });

  // functions
  const goToChat = (chatId: string) => {
    MessgesRead({ chatId: chatId, senderType: UserType.Client });

    setShowSidebar(false);

    navigation.adminSupportChat(chatId);
  };

  return (
    <div
      className="rounded-md border-2 border-gray-400 p-2"
      onClick={() => goToChat(chat.id)}
    >
      {chat.user.username}

      {unreadCount}
    </div>
  );
};

export default AdminSupportUserCard;
