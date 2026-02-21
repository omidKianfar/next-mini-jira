import { Suspense } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useSearchParams } from 'next/navigation';

// ui
import ButtonNext from '@/src/components/atom/buttons-component/button-next';
import PageLoading from '@/src/components/common/page-loading';

// type
import { MyUserType, UserType } from '@/src/types/global';
import { UploadMenuComponentProps } from '../../type';

// lib
import { sendChatMessage } from '@/src/libs/chat/send-message';
import { useUserListenerById } from '@/src/hooks/users/use-user-listener-by-id';

// hook
import { useAuth } from '@/src/hooks/auth/use-auth';

// schema
import RecorderComponent from '../../../recorder/recorder-component';

const VoiceMenuComponent = ({ fileUploader }: UploadMenuComponentProps) => {
  const { cancel, error, fileType, reset, uploading, url } = fileUploader;

  // hooks
  const params = useSearchParams();
  const reciverId = params.get('chatId');

  const { user: currentUser } = useAuth();
  const { user: userChat } = useUserListenerById(reciverId);

  const admin = currentUser?.userType === UserType.Admin;

  const userMessage = admin
    ? (userChat as MyUserType)
    : (currentUser as MyUserType);

  // functions
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
      <div className="h-[220px] rounded-md border-2 border-primary-500 bg-white p-2 lg:pr-0">
        <div className="flex h-full w-full flex-col lg:flex-row">
          <div className="flex h-full w-full items-center justify-start rounded-md border-2 border-gray-400 bg-gray-50 p-2">
            <RecorderComponent fileUploader={fileUploader} />
          </div>

          <div className="mt-4 w-full lg:mt-0 lg:w-[150px]">
            <div className="flex flex-row items-center justify-end lg:flex-col lg:justify-center">
              <ButtonNext
                onClick={handleSend}
                type="submit"
                className="w-[90px] lg:mb-2 lg:w-[125px]"
                disable={!!!url}
              >
                Send
              </ButtonNext>

              <ButtonNext
                onClick={handleCancel}
                className="w-[90px] lg:w-[125px]"
                disable={uploading || !!!url}
              >
                Cancel
              </ButtonNext>

              {error! && <p className="mt-1 text-red-500">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default VoiceMenuComponent;
