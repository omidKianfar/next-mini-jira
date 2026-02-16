import { lazy } from 'react';

// hooks
import { useAuth } from '@/src/hooks/auth/use-auth';

// type
import { ChatMessageItemProps } from '../type';
import { UserType } from '@/src/types/global';

// ui
import MyImage from '../../atom/image-components';
import WaveformPlayer from '../recorder/wave-form-player';

// lazy
const LightBoxComponent = lazy(
  () => import('@/src/components/common/light-box')
);
const MyVideo = lazy(() => import('@/src/components/atom/video-component'));

const ChatMessageItem = ({ message }: ChatMessageItemProps) => {
  // hooks
  const { user } = useAuth();

  const isAdmin = message.senderId === 'admin';

  const menuPosition =
    user?.userType === UserType?.Admin && isAdmin
      ? 'right-[10px]'
      : 'left-[10px]';

  return (
    <div className="relative">
      <div
        className={`${user?.userType == UserType.Client ? (isAdmin ? 'justify-start' : 'justify-end') : isAdmin ? 'justify-end' : 'justify-start'} mb-4 flex items-center`}
      >
        <div className="max-w-[500px]">
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
                <div className="flex h-[64px] w-[250px] items-center justify-center rounded-sm border-2 border-warning-400 bg-primary-100 p-2 px-2 shadow-md lg:w-[400px]">
                  <WaveformPlayer
                    audioUrl={message?.attachment?.fileUrl as string}
                  />
                </div>
              )}
            </div>
          ) : (
            <div
              className={`${isAdmin ? 'bg-gray-200' : 'bg-primary-300'} break-words rounded-lg border border-gray-300 p-2 shadow-md`}
              dangerouslySetInnerHTML={{ __html: message.text as string }}
            />
          )}
        </div>
      </div>

      <div className={`absolute`}>{/* <LongMenu /> */}</div>
    </div>
  );
};

export default ChatMessageItem;
