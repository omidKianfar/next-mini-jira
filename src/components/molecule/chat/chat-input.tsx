import { KeyboardEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";

// ui
import ButtonFreeClass from "../../atom/buttons-component/button-free-class";
import MyIcon from "../../atom/icon-components";

// hooks
import { useAuth } from "@/src/hooks/auth/use-auth";
import { useUserListenerById } from "@/src/hooks/users/use-user-listener-by-id";

// firestore
import { sendChatMessage } from "@/src/libs/chat/sendMessage";

// type
import { MyUserType, UserType } from "@/src/types/global";

const ChatInput = () => {
  // hooks
  const params = useSearchParams();
  const reciverId = params.get("chatId");

  const { user: currentUser } = useAuth();
  const { user: userChat } = useUserListenerById(reciverId);

  // states
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // functions
  const handleSend = () => {
    if (text == "") {
      enqueueSnackbar("Please write your message", { variant: "warning" });
      return;
    }

    setLoading(true);

    try {
      const admin = currentUser?.userType === UserType.Admin;

      const userMessage = admin
        ? (userChat as MyUserType)
        : (currentUser as MyUserType);

      const message = {
        senderId: admin ? "admin" : (currentUser?.userId as string),
        receiverId: admin ? (userChat?.userId as string) : "admin",
        text,
        senderType: admin ? UserType.Admin : UserType.Client,
        attachment: {
          fileUrl: null,
          fileType: null,
        },
      };

      sendChatMessage({ user: userMessage, message: message });

      setText("");
    } catch (error: any) {
      setLoading(false);
      enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (!loading) {
        handleSend();
      }
    }
  };

  return (
    <div className="absolute bottom-0 left-0 flex h-[52px] w-full items-center justify-start rounded-b-md border-t-2 border-dashed border-gray-300 p-1">
      <input
        type="text"
        placeholder="Write your message"
        title={`You can send your message with press Enter key`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="h-full w-full rounded-md border-2 border-primary-500 px-2 text-sm focus:outline-primary-700"
        autoFocus
      />

      <ButtonFreeClass
        onClick={handleSend}
        disable={loading}
        isLoading={loading}
        icon={
          <MyIcon
            icon="iconamoon:send-fill"
            className="text-h2 text-primary-500 hover:text-primary-700"
          />
        }
      />
    </div>
  );
};

export default ChatInput;
