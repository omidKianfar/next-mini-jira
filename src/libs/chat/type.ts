import {
  ChatMessage,
  ChatsType,
  MyUserType,
  UserType,
} from "@/src/types/global";

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

export interface userUnreadCountListenerProps {
  chatId: string;
  senderType: UserType;
  callback: (count: number) => void;
}

export interface ChatsListenerProps {
  callback: (data: ChatsType[]) => void;
}
