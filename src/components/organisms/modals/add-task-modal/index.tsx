'use client';

import { lazy, Suspense, useCallback, useRef, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { useAuth } from '@/src/hooks/auth/use-auth';
import { useImageProcessor } from '@/src/hooks/image-processor/use-image-processor';
import { useVideoProcessor } from '@/src/hooks/video-processor/use-video-processor';
import { useFileUploader } from '@/src/hooks/file-uploader/use-file-uploader';
import { createTaskDocument } from '@/src/libs/tasks/create-task';
import PageLoading from '@/src/components/common/page-loading';
import { TaskShema } from './schema';
import { Task, TaskForm } from '@/src/types/global';
import { AddTaskProps } from './type';

const AddTaskFormComponent = lazy(() => import('./steps/add-task-form'));
const AddTaskUploadCmponent = lazy(() => import('./steps/upload'));

const AddTask = ({ handleClose }: Pick<AddTaskProps, 'handleClose'>) => {
  const { user } = useAuth();

  const isCancelledRef = useRef(false);

  const { processImage } = useImageProcessor({ size: 1024 });

  const {
    compressVideo,
    isCompressing,
    compressionProgress,
    cancelCompression,
  } = useVideoProcessor();

  const { cancel, error, fileType, progress, reset, upload, uploading, url } =
    useFileUploader({
      accept: ['image/*', 'video/*'],
    });

  const [loading, setLoading] = useState<boolean>(false);
  const [number, setNumber] = useState(0);

  const methods = useForm<TaskForm>({
    defaultValues: {
      title: '',
      description: '',
      tag: 'task',
      attachment: {
        fileUrl: null,
        fileType: null,
      },
    },
    resolver: yupResolver(TaskShema),
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
    methods.setValue('attachment.fileUrl', url);
    setNumber(0);
  };

  const handleCancel = () => {
    isCancelledRef.current = true;
    cancelCompression();
    cancel();
    methods.setValue('attachment.fileUrl', '');
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
              url={url}
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
