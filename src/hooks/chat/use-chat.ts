import { ChatContext, ChatContextType, useContext } from '../imports';

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);

  if (!context) throw new Error('useChat must be used within ChatProvider');

  return context;
};
