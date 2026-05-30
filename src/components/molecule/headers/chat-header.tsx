import MyImage from '../../atom/image-components';
import MyIcon from '../../atom/icon-components';
import { ChatSidebar, UserType } from '@/src/types/global';
import { stringSlicer } from '@/src/utils/string-slicer';
import { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';

const ChatHeader = ({ userChat, currentUser }: ChatSidebar) => {
  const isMobile = useIsMobile();

  return (
    <div className="absolute left-0 top-0 z-10 flex h-[60px] w-full items-center justify-start rounded-t-md bg-white/20 px-2 shadow-md backdrop-blur-sm">
      <div className="mr-2 overflow-hidden">
        {userChat?.photo ? (
          <MyImage
            src={userChat.photo as string}
            alt=""
            fill
            className="rounded-full object-cover"
            wrapperClass="relative h-[40px] w-[40px] rounded-full border-2 border-primary-500 "
          />
        ) : currentUser?.userType === UserType.Client ? (
          <MyIcon icon="support" className="text-h3 text-orange-400" />
        ) : (
          <div className="h-[40px] w-[40px] rounded-full border-2 border-primary-500 bg-gray-200"></div>
        )}
      </div>

      <div>
        <p className="mb-1 text-bodySm font-semibold text-gray-700">
          {currentUser?.userType === UserType.Admin
            ? stringSlicer({
                string: userChat?.userName as string,
                slice: isMobile ? 30 : 100,
              })
            : 'Admin'}
        </p>

        <p className="text-caption text-gray-400">
          {currentUser?.userType === UserType.Admin
            ? stringSlicer({
                string: userChat?.email as string,
                slice: isMobile ? 30 : 100,
              })
            : 'Support'}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
