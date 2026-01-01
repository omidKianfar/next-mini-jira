import { useContext } from "react";

// provider
import { ChatContext } from "@/src/providers/chat.provider";

// type
import { ChatContextType } from "@/src/types/global";

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);

  if (!context) throw new Error("useChat must be used within ChatProvider");

  return context;
};
