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

// type
import { UserType } from '@/src/types/global';

const SupportComponent = () => {
  // hook
  const pathname = usePathname();
  const chat = useChat();
  const { user } = useAuth();
  const { setEditorOutput } = useEditor();

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
      className={`relative ${pathname.includes('admin') ? 'h-[calc(100vh-150px)]' : 'h-[calc(100vh-90px)]'} w-full rounded-md border-2 border-warning-400 bg-white shadow-md lg:h-[calc(100vh-110px)]`}
    >
      <ChatMessages
        messages={chat.messages}
        showMenu={showMenu}
        handleTemplateSelect={handleTemplateSelect}
        setEditMessageId={setEditMessageId}
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
