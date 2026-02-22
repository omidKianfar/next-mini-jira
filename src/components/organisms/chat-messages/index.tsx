import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// type
import { ChatMessagesProps } from '../type';

// ui
import ChatMessageItem from '../../molecule/chat/chat-message-item';
import ButtonFreeClass from '../../atom/buttons-component/button-free-class';
import MyIcon from '../../atom/icon-components';

const ChatMessages = ({
  showMenu,
  messages,
  handleTemplateSelect,
  setEditMessageId,
}: ChatMessagesProps) => {
  // ref
  const endMessageRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // state
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // hooks
  const pathname = usePathname();

  // function
  const scrollToBottom = () => {
    endMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const scrollBottom = scrollHeight - scrollTop - clientHeight;
      setShowScrollBtn(scrollBottom > 150);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // style
  const menuHeight =
    pathname.includes('admin') && !showMenu
      ? 'max-h-[calc(100vh-200px)] lg:max-h-[calc(100vh-160px)] '
      : pathname.includes('admin') && showMenu
        ? 'max-h-[calc(100vh-445px)] lg:max-h-[calc(100vh-380px)]'
        : !pathname.includes('admin') && !showMenu
          ? 'max-h-[calc(100vh-140px)] lg:max-h-[calc(100vh-160px)]'
          : 'max-h-[calc(100vh-380px)]';

  return (
    <div className="relative h-full w-full">
      <div
        className={`h-full w-full overflow-y-auto rounded-t-md p-2 lg:p-4 ${menuHeight} `}
        ref={scrollContainerRef}
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

        <div ref={endMessageRef} />
      </div>

      {showScrollBtn && (
        <ButtonFreeClass
          onClick={scrollToBottom}
          className="z-9 absolute right-1/2 top-[32px]"
          icon={
            <MyIcon
              icon="uiw:down-circle"
              className="text-h3 text-primary-500/50 hover:text-primary-700"
            />
          }
        />
      )}
    </div>
  );
};

export default ChatMessages;
