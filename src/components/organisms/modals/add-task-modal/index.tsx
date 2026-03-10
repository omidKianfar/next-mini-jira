'use client';

import {
  useAuth,
  useFileUploader,
  useImageProcessor,
  useVideoProcessor,
  useState,
  TaskForm,
  useForm,
  yupResolver,
  Task,
  dayjs,
  createTaskDocument,
  enqueueSnackbar,
  PageLoading,
  FormProvider,
} from '../../imports';
import { lazy, Suspense } from 'react';
import { AddTaskProps } from '../../type';
import { TaskShema } from './schema';

const AddTaskFormComponent = lazy(() => import('./steps/add-task-form'));
const AddTaskUploadCmponent = lazy(() => import('./steps/upload'));

const AddTask = ({ handleClose }: Pick<AddTaskProps, 'handleClose'>) => {
  const { user } = useAuth();

  const { processImage } = useImageProcessor({ size: 1024 });

  const { compressVideo, isCompressing, compressionProgress } =
    useVideoProcessor();

  const { cancel, error, fileType, progress, reset, upload, uploading, url } =
    useFileUploader({
      accept: ['image/*', 'video/*'],
    });

  const [loading, setLoading] = useState<boolean>(false);
  const [number, setNumber] = useState(0);

  const defaultValues: TaskForm = {
    title: '',
    description: '',
    tag: 'task',
    attachment: {
      fileUrl: null,
      fileType: null,
    },
  };

  const methods = useForm<TaskForm>({
    defaultValues,
    resolver: yupResolver(TaskShema),
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
    methods.setValue('attachment.fileUrl', url);
    setNumber(0);
  };

  const handleCancel = () => {
    methods.setValue('attachment.fileUrl', '');
    cancel();
    setNumber(0);
  };

  const onSubmit = async (values: TaskForm) => {
    setLoading(true);

    try {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: values.title,
        description: values.description,
        status: 'todo',
        tag: values.tag,
        createdAt: dayjs().format('YYYY-MM-DD'),
        attachment: {
          fileUrl: values.attachment?.fileUrl,
          fileType: fileType,
        },
        userId: user?.userId as string,
        updatedAt: '',
      };

      await createTaskDocument(newTask);

      enqueueSnackbar(`Task created successfully`, {
        variant: 'success',
      });
      reset();
      handleClose();
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
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {number == 0 ? (
            <AddTaskFormComponent
              handleClose={handleClose}
              setNumber={setNumber}
              loading={loading}
            />
          ) : (
            <AddTaskUploadCmponent
              uploadProcessHandler={uploadProcessHandler}
              handleCancel={handleCancel}
              handleSave={handleSave}
              progress={progress}
              uploading={uploading}
              error={error}
              fileType={fileType}
              url={url}
              isCompressing={isCompressing}
              compressionProgress={compressionProgress}
            />
          )}
        </form>
      </FormProvider>
    </Suspense>
  );
};

export default AddTask;
