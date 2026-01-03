// type
import { ChatMessagesProps } from "../type";

// ui
import ChatMessageItem from "../../molecule/chat/chat-message-item";
import { usePathname } from "next/navigation";

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const pathname = usePathname();

  return (
    <div
      className={`max-h-[calc(100vh-200px)] w-full overflow-y-auto rounded-t-md p-2
         lg:max-h-[calc(100vh-180px)] lg:p-4 ${pathname.includes("admin") ? "max-h-[calc(100vh-220px)]" : "max-h-[calc(100vh-155px)]"}`}
    >
      {messages.map((message) => (
        <ChatMessageItem key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ChatMessages;
