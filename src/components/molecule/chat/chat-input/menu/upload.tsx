import { lazy, Suspense } from 'react';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';

// ui
import ButtonNext from '@/src/components/atom/buttons-component/button-next';
import LoadingCircle from '@/src/components/atom/loadings/loading-circle';
import PageLoading from '@/src/components/common/page-loading';
import ShowAttachment from './show-attachment';

// type
import { MyUserType, UserType } from '@/src/types/global';
import { UploadMenuComponentProps, UploadMenuForm } from '../../type';

// lib
import { sendChatMessage } from '@/src/libs/chat/sendMessage';
import { useUserListenerById } from '@/src/hooks/users/use-user-listener-by-id';

// hook
import { useAuth } from '@/src/hooks/auth/use-auth';
import { useImageProcessor } from '@/src/hooks/image-processor/use-image-processor';

// schema
import { UploadMenuShema } from './schema';

const DragDropUploader = lazy(
  () => import('@/src/components/organisms/uploads/drag-drop')
);

const UploadMenuComponent = ({ fileUploader }: UploadMenuComponentProps) => {
  const { cancel, error, fileType, progress, reset, upload, uploading, url } =
    fileUploader;

  // hooks
  const params = useSearchParams();
  const reciverId = params.get('chatId');

  const { user: currentUser } = useAuth();

  const { user: userChat } = useUserListenerById(reciverId);

  const { processImage } = useImageProcessor({ size: 1024 });

  const admin = currentUser?.userType === UserType.Admin;

  const userMessage = admin
    ? (userChat as MyUserType)
    : (currentUser as MyUserType);

  // form
  const defaultValues: UploadMenuForm = {
    fileUrl: null,
  };

  const methods = useForm<UploadMenuForm>({
    defaultValues,
    resolver: yupResolver(UploadMenuShema),
  });

  // functions
  const uploadProcessHandler = async (file: File) => {
    let finalFile = file;

    if (file.type.startsWith('image/')) {
      const processed = await processImage(file);

      finalFile = processed;
    }

    await upload({ file: finalFile });
  };

  const handleSave = () => {
    methods.setValue('fileUrl', url);
  };

  const handleCancel = () => {
    methods.setValue('fileUrl', '');
    cancel();
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
      enqueueSnackbar(`Error: ${error?.message || error}. Please try again.`, {
        variant: 'error',
      });
    }
  };

  return (
    <Suspense fallback={<PageLoading />}>
      <div className="rounded-md border-2 border-primary-500 bg-white p-2 lg:pr-0">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex h-full w-full flex-col lg:flex-row">
              <div className="h-full w-full">
                {!url! && progress! < 100 && (
                  <DragDropUploader
                    uploadProcessHandler={uploadProcessHandler}
                    progress={progress}
                    uploading={uploading}
                  />
                )}

                {!url! && progress! === 100 && (
                  <div
                    className={`flex h-[200px] w-full cursor-not-allowed items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 transition-all`}
                  >
                    <LoadingCircle size={40} />
                  </div>
                )}

                {url && <ShowAttachment fileType={fileType} url={url} />}
              </div>

              <div className="mt-4 w-full lg:mt-0 lg:w-[150px]">
                <div className="flex flex-row items-center justify-end lg:flex-col lg:justify-center">
                  <ButtonNext
                    onClick={handleSave}
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
          </form>
        </FormProvider>
      </div>
    </Suspense>
  );
};

export default UploadMenuComponent;
