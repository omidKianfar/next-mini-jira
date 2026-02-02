// hooks
import { useAuth } from '@/src/hooks/auth/use-auth';

// type
import { ChatMessageItemProps } from '../type';
import { UserType } from '@/src/types/global';

const ChatMessageItem = ({ message }: ChatMessageItemProps) => {
  // hooks
  const { user } = useAuth();

  // states
  const isAdmin = message.senderId === 'admin';

  return (
    <div
      className={`${user?.userType == UserType.Client ? (isAdmin ? 'justify-start' : 'justify-end') : isAdmin ? 'justify-end' : 'justify-start'} mb-4 flex items-center`}
    >
      <div className="max-w-[500px]">
        <div
          className={`${isAdmin ? 'bg-gray-200' : 'bg-primary-300'} break-words rounded-lg border border-gray-300 p-2 shadow-md`}
          dangerouslySetInnerHTML={{ __html: message.text as string }}
        ></div>
      </div>
    </div>
  );
};

export default ChatMessageItem;
