'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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
  userChat,
  editMessageId,
}: ChatMessagesProps) => {
  // refs
  const endMessageRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // states
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // hooks
  const pathname = usePathname();

  // functions
  const scrollToBottom = () => {
    scrollContainerRef.current?.scrollTo({
      top: scrollContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
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

    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, [messages]);

  console.log('editMessageId', editMessageId);

  useEffect(() => {
    if (!editMessageId) {
      scrollToBottom();
    }
  }, [messages, userChat]);

  // animation data
  const fadeInVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut' as const,
      },
    },
    exit: { opacity: 0 },
  };

  // style
  const menuHeight =
    pathname.includes('admin') && !showMenu
      ? 'h-[calc(100vh-200px)] lg:h-[calc(100vh-160px)] '
      : pathname.includes('admin') && showMenu
        ? 'h-[calc(100vh-445px)] lg:h-[calc(100vh-380px)]'
        : !pathname.includes('admin') && !showMenu
          ? 'h-[calc(100vh-140px)] lg:h-[calc(100vh-160px)]'
          : 'h-[calc(100vh-400px)] lg:h-[calc(100vh-380px)]';

  return (
    <div className="relative flex h-full w-full flex-col">
      <div
        className={`w-full overflow-y-auto rounded-t-md p-2 transition-all duration-300 lg:p-4 ${menuHeight}`}
        ref={scrollContainerRef}
      >
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={message.id || index}
              variants={fadeInVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <ChatMessageItem
                message={message}
                handleTemplateSelect={() => {
                  handleTemplateSelect?.(message.text as string);
                  setEditMessageId?.(message.id as string);
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        <div ref={endMessageRef} />
      </div>

      <AnimatePresence>
        {showScrollBtn && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute left-1/2 top-[24px] z-50"
          >
            <ButtonFreeClass
              onClick={scrollToBottom}
              icon={
                <MyIcon
                  icon="uiw:down-circle"
                  className="rounded-full text-h2 text-primary-500 shadow-sm hover:text-primary-700"
                />
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatMessages;
