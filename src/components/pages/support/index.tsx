'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// hook
import { useChat } from '@/src/hooks/chat/use-chat';
import { useAuth } from '@/src/hooks/auth/use-auth';
import { useEditor } from '@/src/hooks/editor/use-editor';

// lib
import { MessgesRead } from '@/src/libs/chat/read-message';

// ui
import ChatMessages from '../../organisms/chat-messages';
import ChatInput from '../../molecule/chat/chat-input';
import ChatHeader from '../../molecule/headers/chat-header';

// type
import { UserType } from '@/src/types/global';

const SupportComponent = () => {
  // hook
  const pathname = usePathname();
  const chat = useChat();
  const { user } = useAuth();
  const { setEditorOutput, resetEditor } = useEditor();

  // state
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [editorKey, setEditorKey] = useState<number>(0);
  const [editMessageId, setEditMessageId] = useState<string | null>(null);

  const isAdmin = user?.userType == UserType.Admin;

  // function
  useEffect(() => {
    MessgesRead({
      chatId: !isAdmin ? (user?.userId as string) : (chat.chatId as string),
      senderType: !isAdmin ? UserType.Admin : UserType.Client,
    });

    resetEditor();
  }, [chat]);

  const handleTemplateSelect = (content: string) => {
    setEditorOutput?.(content);
    setEditorKey((prev) => prev + 1);
  };

  if (!chat) {
    throw new Error('ChatContext is not available!');
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-md border-2 border-warning-400 bg-white pt-[40px] shadow-md lg:h-[calc(100vh-110px)] ${pathname.includes('admin') ? 'h-[calc(100vh-150px)]' : 'h-[calc(100vh-90px)]'} `}
    >
      <ChatHeader userChat={chat.userChat} currentUser={user} />

      <ChatMessages
        messages={chat.messages}
        showMenu={showMenu}
        handleTemplateSelect={handleTemplateSelect}
        editMessageId={editMessageId}
        setEditMessageId={setEditMessageId}
        userChat={chat.userChat}
      />

      <ChatInput
        setShowMenu={setShowMenu}
        showMenu={showMenu}
        editorKey={editorKey}
        editMessageId={editMessageId}
        setEditMessageId={setEditMessageId}
      />
    </div>
  );
};

export default SupportComponent;
