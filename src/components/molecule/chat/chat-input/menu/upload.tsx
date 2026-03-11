import { lazy } from 'react';
import {
  ButtonFreeClass,
  DragDropUploader,
  enqueueSnackbar,
  FormProvider,
  LoadingCircle,
  MyIcon,
  MyUserType,
  PageLoading,
  sendChatMessage,
  Suspense,
  useAuth,
  useForm,
  useImageProcessor,
  UserType,
  useSearchParams,
  useUserListenerById,
  useVideoProcessor,
  yupResolver,
} from '../../../imports';
import { UploadMenuComponentProps, UploadMenuForm } from '../../type';
import { UploadMenuShema } from './schema';

const ShowAttachment = lazy(() => import('./show-attachment'));

const UploadMenuComponent = ({ fileUploader }: UploadMenuComponentProps) => {
  const params = useSearchParams();
  const reciverId = params.get('chatId');

  const { cancel, error, fileType, progress, reset, upload, uploading, url } =
    fileUploader;
  const { processImage } = useImageProcessor({ size: 1024 });
  const { compressVideo, isCompressing, compressionProgress } =
    useVideoProcessor();

  const { user: userChat } = useUserListenerById(reciverId);
  const { user: currentUser } = useAuth();

  const admin = currentUser?.userType === UserType.Admin;

  const userMessage = admin
    ? (userChat as MyUserType)
    : (currentUser as MyUserType);

  const defaultValues: UploadMenuForm = {
    fileUrl: null,
  };

  const methods = useForm<UploadMenuForm>({
    defaultValues,
    resolver: yupResolver(UploadMenuShema),
  });

  const uploadProcessHandler = async (file: File) => {
    let finalFile = file;

    if (file.type.startsWith('image/')) {
      finalFile = await processImage(file);
    } else if (file.type.startsWith('video/')) {
      finalFile = await compressVideo(file);
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
      <div className={`p-2`}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex h-full w-full flex-col lg:flex-row">
              {isCompressing ? (
                <div className="flex h-[223px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary-300 bg-primary-50 lg:h-[200px]">
                  <p className="mb-2 mt-2 text-label font-semibold text-warning-500">
                    Optimizing Video:
                    <span className="ml-1 animate-pulse text-subtitle text-primary-500">
                      {compressionProgress} %
                    </span>
                  </p>

                  <p className="text-caption text-gray-400">
                    Please wait, this happens in your browser...
                  </p>
                </div>
              ) : (
                !url &&
                progress < 100 && (
                  <div className="h-[223px] w-full lg:h-[200px]">
                    <DragDropUploader
                      uploadProcessHandler={uploadProcessHandler}
                      progress={progress}
                      uploading={uploading}
                    />
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
                <div className="mb-2 h-[187px] w-full lg:mb-0 lg:h-[200px]">
                  <ShowAttachment fileType={fileType} url={url} />
                </div>
              )}

              {!!url && (
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
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </Suspense>
  );
};

export default UploadMenuComponent;
