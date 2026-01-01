// type

// ui
import ChatMessageItem from "../../../molecule/chat/chat-message-item";
import { ChatMessagesProps } from "../../type";

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <div className="max-h-[calc(100vh-165px)] w-full overflow-y-auto rounded-t-md p-2 shadow-sm lg:p-4">
      {messages.map((message) => (
        <ChatMessageItem key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ChatMessages;
