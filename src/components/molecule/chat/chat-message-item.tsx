import { lazy, Suspense, useState } from 'react';
import { useAuth } from '@/src/hooks/auth/use-auth';
import { deleteChatMessage } from '@/src/libs/chat/delete-message';
import ModalComponent from '../modals/modal-component';
import PageLoading from '../../common/page-loading';
import MyImage from '../../atom/image-components';
import MyIcon from '../../atom/icon-components';
import ModalContainer from '../../common/modal-container';
import { ChatMessage, UserType } from '@/src/types/global';

export const MyVideo = lazy(
  () => import('@/src/components/atom/video-component')
);
export const LightBoxComponent = lazy(
  () => import('@/src/components/common/light-box')
);
const WaveformPlayer = lazy(() => import('../recorder/wave-form-player'));

interface ChatMessageItemProps {
  message: ChatMessage;
  handleTemplateSelect?: (text: string) => void;
}

const ChatMessageItem = ({
  message,
  handleTemplateSelect,
}: ChatMessageItemProps) => {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const isAdmin = message.senderId === 'admin';

  const currentUser =
    (user?.userType === UserType.Client && !isAdmin) ||
    (user?.userType === UserType.Admin && isAdmin);

  const deleteMessage = () => {
    deleteChatMessage({
      userId: message.chatId as string,
      messageId: message.id as string,
    });
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <div
      className={`w-full ${user?.userType == UserType.Client ? (isAdmin ? 'justify-end' : 'justify-start') : isAdmin ? 'justify-start' : 'justify-end'} mb-4 flex items-center`}
    >
      <Suspense fallback={<PageLoading />}>
        <div className="w-full min-w-[300px] max-w-[500px] pt-8">
          {message?.attachment?.fileType ? (
            <div>
              {message?.attachment?.fileType === 'image' && (
                <LightBoxComponent url={message?.attachment?.fileUrl as string}>
                  <div
                    className={`relative aspect-[4/3] w-full cursor-pointer overflow-hidden border-2 shadow-md ${currentUser ? 'rounded-t-lg border-b-0 border-primary-400 bg-primary-100' : 'rounded-lg border-warning-400 bg-warning-100'}`}
                  >
                    <MyImage
                      src={message?.attachment?.fileUrl as string}
                      alt="preview"
                      fill
                      wrapperClass="w-full h-full"
                      className="object-contain"
                    />
                  </div>
                </LightBoxComponent>
              )}

              {message?.attachment?.fileType === 'video' && (
                <div
                  className={`aspect-square w-full overflow-hidden border-2 shadow-md ${currentUser ? 'rounded-t-lg border-b-0 border-primary-400 bg-primary-100' : 'rounded-lg border-warning-400 bg-warning-100'}`}
                >
                  <MyVideo
                    src={message?.attachment?.fileUrl as string}
                    alt="preview"
                    className="h-full w-full rounded-t-lg object-contain"
                  />
                </div>
              )}

              {message?.attachment?.fileType === 'voice' && (
                <div
                  className={`flex h-[64px] w-full items-center justify-center border-2 bg-primary-100 p-2 px-2 shadow-md lg:w-[500px] ${currentUser ? 'rounded-t-lg border-b-0 border-primary-400 bg-primary-100' : 'rounded-lg border-warning-400 bg-warning-100'}`}
                >
                  <WaveformPlayer
                    audioUrl={message?.attachment?.fileUrl as string}
                  />
                </div>
              )}
            </div>
          ) : (
            <div
              className={`prose prose-sm break-words border-2 p-2 shadow-md ${currentUser ? 'rounded-t-lg border-b-0 border-primary-400 bg-primary-100' : 'rounded-lg border-warning-400 bg-warning-100'}`}
              dangerouslySetInnerHTML={{ __html: message.text as string }}
            />
          )}

          {currentUser ? (
            <div
              className={`flex h-full w-full items-center justify-between rounded-b-lg border-2 border-t-0 border-primary-400 p-2 shadow-md`}
            >
              <MyIcon
                icon="delete"
                className="cursor-pointer text-subtitle text-error-500 hover:text-error-700"
                onClick={handleOpenModal}
              />

              {message.text !== '' && (
                <MyIcon
                  icon="edit"
                  className="cursor-pointer text-subtitle text-primary-500 hover:text-primary-700"
                  onClick={() => handleTemplateSelect?.(message.text as string)}
                />
              )}
            </div>
          ) : null}
        </div>
      </Suspense>

      <ModalContainer open={open} handleClose={handleCloseModal}>
        <ModalComponent
          isDelete
          handleClose={handleCloseModal}
          clickHandler={deleteMessage}
          title={'Are you sure you want to delete this message?'}
          description={
            message.attachment?.fileType
              ? message.attachment.fileType
              : message.text
          }
        />
      </ModalContainer>
    </div>
  );
};

export default ChatMessageItem;
