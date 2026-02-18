import { lazy } from 'react';

// hooks
import { useAuth } from '@/src/hooks/auth/use-auth';

// type
import { ChatMessageItemProps } from '../type';
import { UserType } from '@/src/types/global';

// ui
import MyImage from '../../atom/image-components';
import WaveformPlayer from '../recorder/wave-form-player';
import MyIcon from '../../atom/icon-components';

// lazy
const LightBoxComponent = lazy(
  () => import('@/src/components/common/light-box')
);
const MyVideo = lazy(() => import('@/src/components/atom/video-component'));

const ChatMessageItem = ({ message }: ChatMessageItemProps) => {
  // hooks
  const { user } = useAuth();

  const isAdmin = message.senderId === 'admin';

  return (
    <div
      className={`w-full ${user?.userType == UserType.Client ? (isAdmin ? 'justify-start' : 'justify-end') : isAdmin ? 'justify-end' : 'justify-start'} mb-4 flex items-center`}
    >
      <div className="relative max-w-[500px]">
        {message?.attachment?.fileType ? (
          <div>
            {message?.attachment?.fileType === 'image' && (
              <LightBoxComponent url={message?.attachment?.fileUrl as string}>
                <MyImage
                  src={message?.attachment?.fileUrl as string}
                  alt="preview"
                  fill
                  wrapperClass="relative cursor-pointer w-[190px] h-[190px] overflow-hidden rounded-lg p-1 shadow-md border-2 border-warning-400"
                  className="object-cover"
                />
              </LightBoxComponent>
            )}

            {message?.attachment?.fileType === 'video' && (
              <MyVideo
                src={message?.attachment?.fileUrl as string}
                alt="preview"
                className="w-[330px] rounded-lg border-2 border-warning-400 shadow-md"
              />
            )}

            {message?.attachment?.fileType === 'voice' && (
              <div
                className={`flex h-[64px] w-[250px] items-center justify-center rounded-sm border-2 ${isAdmin ? 'border-warning-500' : 'border-primary-500'} bg-primary-100 p-2 px-2 shadow-md lg:w-[400px]`}
              >
                <WaveformPlayer
                  audioUrl={message?.attachment?.fileUrl as string}
                />
              </div>
            )}
          </div>
        ) : (
          <div
            className={`border-2 ${isAdmin ? 'border-warning-500 bg-warning-100' : 'border-primary-500 bg-primary-100'} break-words rounded-lg p-2 shadow-md`}
            dangerouslySetInnerHTML={{ __html: message.text as string }}
          />
        )}

        <div
          className={`absolute top-1/3 ${
            user?.userType == UserType.Client
              ? isAdmin
                ? 'right-[-24px]'
                : 'left-[-24px]'
              : isAdmin
                ? 'left-[-24px]'
                : 'right-[-24px]'
          } mb-4 flex items-center`}
        >
          <MyIcon
            icon="solar:menu-dots-square-bold-duotone"
            className="cursor-pointer text-subtitle text-gray-500 hover:text-primary-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatMessageItem;
