import { usePathname } from 'next/navigation';

// type
import { ChatMessagesProps } from '../type';

// ui
import ChatMessageItem from '../../molecule/chat/chat-message-item';

const ChatMessages = ({
  showMenu,
  messages,
  handleTemplateSelect,
  setEditMessageId,
}: ChatMessagesProps) => {
  // hooks
  const pathname = usePathname();

  return (
    <div
      className={`max-h-[calc(100vh-200px)] w-full overflow-y-auto rounded-t-md p-2 ${!showMenu ? 'lg:max-h-[calc(100vh-120px)]' : 'lg:max-h-[calc(100vh-280px)]'} lg:p-4 ${pathname.includes('admin') ? 'max-h-[calc(100vh-320px)]' : 'max-h-[calc(100vh-255px)]'}`}
    >
      {messages.map((message) => (
        <ChatMessageItem
          key={message.id}
          message={message}
          handleTemplateSelect={() => {
            handleTemplateSelect?.(message.text as string);
            setEditMessageId?.(message.id as string);
          }}
        />
      ))}
    </div>
  );
};

export default ChatMessages;
