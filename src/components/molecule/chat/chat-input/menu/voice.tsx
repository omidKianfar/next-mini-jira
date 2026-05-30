import { lazy, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useAuth } from '@/src/hooks/auth/use-auth';
import { useUserListenerById } from '@/src/hooks/users/use-user-listener-by-id';
import { sendChatMessage } from '@/src/libs/chat/send-message';
import ButtonFreeClass from '@/src/components/atom/buttons-component/button-free-class';
import MyIcon from '@/src/components/atom/icon-components';
import PageLoading from '@/src/components/common/page-loading';
import {
  MyUserType,
  UploadMenuComponentProps,
  UserType,
} from '@/src/types/global';

const RecorderComponent = lazy(
  () => import('../../../recorder/recorder-component')
);

const VoiceMenuComponent = ({ fileUploader }: UploadMenuComponentProps) => {
  const { cancel, error, fileType, reset, uploading, url } = fileUploader;
  const params = useSearchParams();
  const reciverId = params.get('chatId');

  const { user: currentUser } = useAuth();
  const { user: userChat } = useUserListenerById(reciverId);

  const admin = currentUser?.userType === UserType.Admin;

  const userMessage = admin
    ? (userChat as MyUserType)
    : (currentUser as MyUserType);

  const handleCancel = () => {
    cancel();
  };

  const handleSend = async () => {
    try {
      const message = {
        senderId: admin ? 'admin' : (currentUser?.userId as string),
        receiverId: admin ? (userChat?.userId as string) : 'admin',
        text: '',
        senderType: admin ? UserType.Admin : UserType.Client,
        attachment: {
          fileUrl: url,
          fileType: fileType,
        },
      };

      sendChatMessage({ user: userMessage as MyUserType, message: message });

      reset();
    } catch (error: any) {
      enqueueSnackbar(`Error: ${error?.message || error}. Please try again.`, {
        variant: 'error',
      });
    }
  };

  return (
    <Suspense fallback={<PageLoading />}>
      <div className="h-[242px] p-2 lg:h-[220px]">
        <div className="flex h-full w-full flex-col lg:flex-row">
          <div className="flex h-[220px] w-full items-center justify-start rounded-md border-2 border-gray-400 bg-gray-50 p-2 lg:h-[200px]">
            <RecorderComponent fileUploader={fileUploader} />
          </div>

          {!!url && (
            <div className="h-full w-full p-1 lg:w-[80px] lg:p-0">
              <div className="flex w-full flex-row-reverse items-center justify-between lg:flex-col lg:justify-center">
                <ButtonFreeClass
                  onClick={handleSend}
                  type="submit"
                  className="lg:mb-2"
                  disable={!!!url}
                  icon={
                    <MyIcon
                      icon="send"
                      className="text-h4 text-primary-500 hover:text-primary-700 lg:text-h2"
                    />
                  }
                />
                <ButtonFreeClass
                  onClick={handleCancel}
                  disable={uploading || !!!url}
                  icon={
                    <MyIcon
                      icon="close"
                      className="text-h4 text-error-500 hover:text-error-700 lg:text-h2"
                    />
                  }
                />

                {error! && <p className="mt-1 text-red-500">{error}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default VoiceMenuComponent;
