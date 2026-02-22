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

  const menuHeight =
    pathname.includes('admin') && !showMenu
      ? 'max-h-[calc(100vh-200px)] lg:max-h-[calc(100vh-160px)] '
      : pathname.includes('admin') && showMenu
        ? 'max-h-[calc(100vh-445px)] lg:max-h-[calc(100vh-380px)]'
        : !pathname.includes('admin') && !showMenu
          ? 'max-h-[calc(100vh-140px)] lg:max-h-[calc(100vh-160px)]'
          : 'max-h-[calc(100vh-380px)]';

  return (
    <div
      className={`h-full w-full overflow-y-auto rounded-t-md p-2 lg:p-4 ${menuHeight} `}
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
