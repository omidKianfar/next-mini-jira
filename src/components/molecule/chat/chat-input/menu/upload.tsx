import { lazy, Suspense, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

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
  const { user: currentUser } = useAuth();

  // states
  const [loading, setLoading] = useState<boolean>(false);

  // form
  const defaultValues: UploadMenuForm = {
    fileUrl: null,
  };

  const methods = useForm<UploadMenuForm>({
    defaultValues,
    resolver: yupResolver(UploadMenuShema),
  });

  const { processImage } = useImageProcessor({ size: 1024 });

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

  const admin = currentUser?.userType === UserType.Admin;

  const onSubmit = async (values: UploadMenuForm) => {
    setLoading(true);

    try {
      const message = {
        senderId: admin ? 'admin' : (currentUser?.userId as string),
        receiverId: admin ? (currentUser?.userId as string) : 'admin',
        text: '',
        senderType: admin ? UserType.Admin : UserType.Client,
        attachment: {
          fileUrl: values?.fileUrl,
          fileType: fileType,
        },
      };

      sendChatMessage({ user: currentUser as MyUserType, message: message });

      reset();
    } catch (error: any) {
      enqueueSnackbar(`Error: ${error?.message || error}. Please try again.`, {
        variant: 'error',
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<PageLoading />}>
      <div className="rounded-md border-2 border-primary-500 bg-white p-2 pr-0">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex h-full w-full">
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

              <div className="w-[150px]">
                <div className="flex flex-col items-center justify-center">
                  <ButtonNext
                    onClick={handleSave}
                    type="submit"
                    className="mb-2 w-[90px] lg:w-[125px]"
                    disable={loading}
                    isLoading={loading}
                  >
                    Send
                  </ButtonNext>

                  <ButtonNext
                    onClick={handleCancel}
                    className="w-[90px] lg:w-[125px]"
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
