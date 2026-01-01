// hooks
import { useUnreadCount } from "@/src/hooks/chat/use-unread-count";
import { useNavigation } from "@/src/hooks/navigation/use-navigation";

// firestore
import { MessgesRead } from "@/src/libs/chat/message-read";

// type
import { ChatsType, UserType } from "@/src/types/global";

const AdminSupportUserCard = ({
  chat,
  setSidebarShow,
}: {
  chat: ChatsType;
  setSidebarShow: (shoe: boolean) => void;
}) => {
  // hooks
  const navigation = useNavigation();
  const unreadCount = useUnreadCount({chatId:chat.id,senderType : UserType.Client});

  // functions
  const goToChat = (chatId: string) => {
    MessgesRead({ chatId: chatId, senderType: UserType.Client });

    setSidebarShow(false);

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
