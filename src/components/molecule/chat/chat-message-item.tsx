// type
import { useAuth } from "@/src/hooks/auth/use-auth";
import { ChatMessageItemProps } from "../type";
import { UserType } from "@/src/types/global";

const ChatMessageItem = ({ message }: ChatMessageItemProps) => {
  // hooks
  const { user } = useAuth();

  // states
  const isAdmin = message.senderId === "admin";

  return (
    <div
      className={`${user?.userType == UserType.Client ? (isAdmin ? "justify-start" : "justify-end") : isAdmin ? "justify-end" : "justify-start"} mb-4 flex items-center`}
    >
      <div className="max-w-[50%]">
        <p
          className={`${isAdmin ? "bg-gray-200" : "bg-primary-300"} break-words rounded-lg border border-gray-300 p-2 shadow-md`}
        >
          {message.text}
        </p>
      </div>
    </div>
  );
};

export default ChatMessageItem;
