import { ChatContext } from '@/src/providers/chat.provider';
import { useContext } from 'react';

export const useChat = () => {
  const context = useContext(ChatContext);

  if (!context) throw new Error('useChat must be used within ChatProvider');

  return context;
};
