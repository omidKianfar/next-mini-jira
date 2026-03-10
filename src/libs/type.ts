import { AppDispatch, ChatMessage, MyUserType, UserType } from './imports';

interface ListenToUserProps {
  dispatch: AppDispatch;
}

interface SendMessageProps {
  user: MyUserType;
  message: ChatMessage;
}

interface MessgesReadProps {
  chatId: string;
  senderType: UserType;
}

interface ChatMessagesListenerProps {
  user: MyUserType;
  onReceive: (messages: ChatMessage[]) => void;
}

interface userUnreadMessageListenerProps {
  chatId: string;
  senderType: UserType;
  callback: (count: number) => void;
}

interface AdminChatsListenerProps {
  dispatch: AppDispatch;
}

interface DeleteChatMessageProps {
  userId: string;
  messageId: string;
}

interface UpdateChatMessageProps {
  userId: string;
  messageId: string;
  newText: string;
}

interface ListenToTasksProps {
  userId: string;
  dispatch: AppDispatch;
}

interface UpdateTaskStatusProps {
  id: string;
  status: string;
}

interface FetchTaskProps {
  taskId: string;
}

interface DeleteTaskProps {
  taskId: string;
}

export type {
  ListenToUserProps,
  SendMessageProps,
  MessgesReadProps,
  ChatMessagesListenerProps,
  userUnreadMessageListenerProps,
  AdminChatsListenerProps,
  DeleteChatMessageProps,
  UpdateChatMessageProps,
  ListenToTasksProps,
  UpdateTaskStatusProps,
  FetchTaskProps,
  DeleteTaskProps,
};
