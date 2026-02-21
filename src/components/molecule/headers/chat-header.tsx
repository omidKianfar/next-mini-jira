// type
import { UserType } from '@/src/types/global';
import MyImage from '../../atom/image-components';
import { ChatSidebar } from '../type';
import MyIcon from '../../atom/icon-components';

const ChatHeader = ({ userChat, currentUser }: ChatSidebar) => {
  return (
    <div className="flex h-[60px] w-full items-center justify-start rounded-t-md bg-white/80 px-2 shadow-md backdrop-blur-sm">
      <div className="mr-2 overflow-hidden">
        {userChat?.photo ? (
          <MyImage
            src={userChat.photo as string}
            alt=""
            fill
            className="rounded-full object-cover"
            wrapperClass="relative h-[40px] w-[40px] rounded-full border-2 border-primary-500 "
          />
        ) : (
          <MyIcon icon="bx:support" className="text-h3 text-orange-400" />
        )}
      </div>

      <div>
        <p className="mb-1 text-bodySm font-semibold text-gray-700">
          {currentUser?.userType === UserType.Admin
            ? userChat?.userName
            : 'Admin'}
        </p>

        <p className="text-caption text-gray-400">
          {currentUser?.userType === UserType.Admin
            ? userChat?.userName
            : 'Support'}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
