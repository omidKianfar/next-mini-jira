// type
import { ChatMessagesProps } from '../type';

// ui
import ChatMessageItem from '../../molecule/chat/chat-message-item';
import { usePathname } from 'next/navigation';

const ChatMessages = ({ showMenu, messages }: ChatMessagesProps) => {
  const pathname = usePathname();

  return (
    <div
      className={`max-h-[calc(100vh-200px)] w-full overflow-y-auto rounded-t-md p-2 ${!showMenu ? 'lg:max-h-[calc(100vh-120px)]' : 'lg:max-h-[calc(100vh-280px)]'} lg:p-4 ${pathname.includes('admin') ? 'max-h-[calc(100vh-320px)]' : 'max-h-[calc(100vh-255px)]'}`}
    >
      {messages.map((message) => (
        <ChatMessageItem key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ChatMessages;
