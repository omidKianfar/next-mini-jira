import { useSearchParams } from 'next/navigation';

// hooks
import { useUnreadCount } from '@/src/hooks/chat/use-unread-count';
import { useNavigation } from '@/src/hooks/navigation/use-navigation';

// firestore
import { MessgesRead } from '@/src/libs/chat/read-message';

// type
import { UserType } from '@/src/types/global';
import { chatSidebarProps } from '../../organisms/type';

// ui
import MyImage from '../../atom/image-components';
import MyIcon from '../../atom/icon-components';

// utils
import { stringSlicer } from '@/src/utils/string-slicer';
import UnSeenMessageCalc from '@/src/utils/unseen-calc';

const AdminSupportUserCard = ({
  chat,
  setShowSidebar,
}: Pick<chatSidebarProps, 'chat' | 'setShowSidebar'>) => {
  // hooks
  const params = useSearchParams();
  const chatId = params.get('chatId');

  const navigation = useNavigation();

  const unreadCount = useUnreadCount({
    chatId: chat.id,
    senderType: UserType.Client,
  });

  // functions
  const goToChat = (chatId: string) => {
    MessgesRead({ chatId: chatId, senderType: UserType.Client });

    setShowSidebar?.(false);

    navigation.adminSupportChat(chatId);
  };

  return (
    <div
      className={`max relative mb-4 w-full cursor-pointer rounded-lg border-2 ${chatId === chat.id ? 'border-success-400 shadow-sm' : 'border-warning-400 shadow-md'} bg-gray-50 p-2`}
      onClick={() => goToChat(chat.id)}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center justify-start">
          <div className="mr-2 overflow-hidden">
            {chat.user.photo ? (
              <MyImage
                src={chat.user.photo as string}
                alt=""
                fill
                className="rounded-full object-cover"
                wrapperClass="relative h-[40px] w-[40px] rounded-full border-2 border-primary-500 "
              />
            ) : (
              <div className="h-[40px] w-[40px] rounded-full border-2 border-primary-500 bg-gray-200"></div>
            )}
          </div>

          <p className="text-label text-gray-600">
            {stringSlicer({
              string: chat.user.email as string,
              slice: 30,
            })}
          </p>
        </div>

        {chatId === chat.id && (
          <MyIcon icon="tick" className="text-success-400" />
        )}
      </div>

      <div className="rounded-sm border border-gray-100 p-2 shadow-md">
        {chat.message.lastMessageAttachment.fileType ? (
          <div className="break-words text-label text-gray-400">
            have a
            <span className="mx-1 text-gray-500">
              {chat.message.lastMessageAttachment.fileType}
            </span>
            attachment
          </div>
        ) : (
          <div
            className="break-words text-label"
            dangerouslySetInnerHTML={{
              __html: stringSlicer({
                string: chat.message.lastMessageText as string,
                slice: 80,
              }),
            }}
          ></div>
        )}
      </div>

      {unreadCount ? (
        <div className="mt-2 flex w-full items-center justify-between">
          <UnSeenMessageCalc date={chat.message.updatedAt} />

          <p className="rounded-full bg-warning-500 px-2 text-label text-white">
            {unreadCount}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default AdminSupportUserCard;
