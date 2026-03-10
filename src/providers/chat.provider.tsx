'use client';

import {
  ChatContextType,
  ChatMessage,
  ChatMessagesListener,
  createContext,
  MyUserType,
  ReactNode,
  useAuth,
  useEffect,
  usePathname,
  UserType,
  useSearchParams,
  useState,
  useUserListenerById,
} from './imports';

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const params = useSearchParams();
  const chatId = params.get('chatId');

  const { user: currentUser } = useAuth();
  const { user: userChat } = useUserListenerById(chatId);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!currentUser) return;

    const finalUser =
      currentUser?.userType === UserType.Admin &&
      pathname.includes('/admin/support/chat')
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
    <ChatContext.Provider value={{ messages, chatId, userChat }}>
      {children}
    </ChatContext.Provider>
  );
};
