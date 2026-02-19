// redux
import { AppDispatch } from '@/src/store';

// type
import { ChatMessage, MyUserType, UserType } from '@/src/types/global';

export interface SendMessageProps {
  user: MyUserType;
  message: ChatMessage;
}

export interface MessgesReadProps {
  chatId: string;
  senderType: UserType;
}

export interface ChatMessagesListenerProps {
  user: MyUserType;
  onReceive: (messages: ChatMessage[]) => void;
}

export interface userUnreadMessageListenerProps {
  chatId: string;
  senderType: UserType;
  callback: (count: number) => void;
}

export interface AdminChatsListenerProps {
  dispatch: AppDispatch;
}
export interface DeleteChatMessageProps {
  userId: string;
  messageId: string;
}
