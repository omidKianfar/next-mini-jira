import { lazy, Suspense, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { useAuth } from '@/src/hooks/auth/use-auth';
import { useImageProcessor } from '@/src/hooks/image-processor/use-image-processor';
import { useVideoProcessor } from '@/src/hooks/video-processor/use-video-processor';
import { useUserListenerById } from '@/src/hooks/users/use-user-listener-by-id';
import { sendChatMessage } from '@/src/libs/chat/send-message';
import LoadingCircle from '@/src/components/atom/loadings/loading-circle';
import ButtonFreeClass from '@/src/components/atom/buttons-component/button-free-class';
import MyIcon from '@/src/components/atom/icon-components';
import { UploadMenuShema } from './schema';
import {
  MyUserType,
  UploadMenuComponentProps,
  UploadMenuForm,
  UserType,
} from '@/src/types/global';

const DragDropUploader = lazy(
  () => import('@/src/components/organisms/uploads/drag-drop')
);
const ShowAttachment = lazy(() => import('./show-attachment'));

const UploadMenuComponent = ({ fileUploader }: UploadMenuComponentProps) => {
  const params = useSearchParams();
  const reciverId = params.get('chatId');

  const isCancelledRef = useRef(false);

  const { cancel, error, fileType, progress, reset, upload, uploading, url } =
    fileUploader;
  const { processImage } = useImageProcessor({ size: 1024 });
  const {
    compressVideo,
    isCompressing,
    compressionProgress,
    cancelCompression,
  } = useVideoProcessor();

  const { user: userChat } = useUserListenerById(reciverId);
  const { user: currentUser } = useAuth();

  const admin = currentUser?.userType === UserType.Admin;

  const userMessage = admin
    ? (userChat as MyUserType)
    : (currentUser as MyUserType);

  const methods = useForm<UploadMenuForm>({
    defaultValues: {
      fileUrl: null,
    },
    resolver: yupResolver(UploadMenuShema),
  });

  const uploadProcessHandler = useCallback(
    async (file: File) => {
      isCancelledRef.current = false;

      let finalFile = file;
      try {
        if (file.type.startsWith('image/')) {
          finalFile = await processImage(file);
        } else if (file.type.startsWith('video/')) {
          const compressed = await compressVideo(file);

          if (isCancelledRef.current || !compressed) return;

          finalFile = compressed;
        }

        if (isCancelledRef.current) return;

        await upload({ file: finalFile });
      } catch (err) {
        console.error('Upload process error:', err);
      }
    },
    [processImage, compressVideo, upload]
  );

  const handleSave = () => {
    methods.setValue('fileUrl', url);
  };

  const handleCancel = () => {
    isCancelledRef.current = true;
    cancelCompression();
    cancel();
    methods.setValue('fileUrl', '');
    reset();
  };

  const onSubmit = async (values: UploadMenuForm) => {
    try {
      const message = {
        senderId: admin ? 'admin' : (currentUser?.userId as string),
        receiverId: admin ? (userChat?.userId as string) : 'admin',
        text: '',
        senderType: admin ? UserType.Admin : UserType.Client,
        attachment: {
          fileUrl: values?.fileUrl,
          fileType: fileType,
        },
      };

      sendChatMessage({ user: userMessage as MyUserType, message: message });

      reset();
    } catch (error: any) {
      enqueueSnackbar(`Error: ${error.message || error}. Please try again.`, {
        variant: 'error',
      });
    }
  };

  return (
    <div className={`p-2`}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex h-full w-full flex-col lg:flex-row">
            {isCompressing ? (
              <div className="flex h-[223px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary-300 bg-primary-50 lg:h-[200px]">
                <p className="mb-2 mt-2 text-label font-semibold text-warning-500">
                  Optimizing and compressing Video:
                  <span className="ml-1 animate-pulse text-subtitle text-primary-500">
                    {compressionProgress} %
                  </span>
                </p>

                <p className="text-caption text-gray-400">
                  Please wait, this happens in your browser...
                </p>

                <ButtonFreeClass
                  className="mt-4 rounded-sm border border-warning-500 bg-white px-8 py-2 text-label text-warning-500 hover:bg-warning-500 hover:text-white"
                  onClick={handleCancel}
                >
                  Cancel upload
                </ButtonFreeClass>
              </div>
            ) : (
              !url &&
              progress < 100 && (
                <div className="h-[223px] w-full lg:h-[200px]">
                  <Suspense
                    fallback={
                      <div className="flex h-full w-full items-center justify-center">
                        <LoadingCircle size={40} />
                      </div>
                    }
                  >
                    <DragDropUploader
                      uploadProcessHandler={uploadProcessHandler}
                      progress={progress}
                      uploading={uploading}
                    />
                  </Suspense>
                </div>
              )
            )}

            {!url! && progress! === 100 && (
              <div className="h-[223px] w-full lg:h-[200px]">
                <div
                  className={`flex h-[220px] w-full cursor-not-allowed items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 transition-all lg:h-[200px]`}
                >
                  <LoadingCircle size={40} />
                </div>
              </div>
            )}

            {url && (
              <>
                <div className="mb-2 h-[187px] w-full lg:mb-0 lg:h-[200px]">
                  <Suspense
                    fallback={
                      <div className="flex h-full w-full items-center justify-center">
                        <LoadingCircle size={40} />
                      </div>
                    }
                  >
                    <ShowAttachment fileType={fileType} url={url} />
                  </Suspense>
                </div>

                <div className="h-full w-full lg:w-[80px]">
                  <div className="flex w-full flex-row-reverse items-center justify-between lg:flex-col lg:justify-center">
                    <ButtonFreeClass
                      onClick={handleSave}
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
              </>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default UploadMenuComponent;
