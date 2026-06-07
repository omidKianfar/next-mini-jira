'use client';

import { lazy, Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';
import { useNavigation } from '@/src/hooks/navigation/use-navigation';
import { useRequireActiveStatus } from '@/src/hooks/pages-user-status-require/use-require-active-status';
import { useRequirePaymentStatus } from '@/src/hooks/pages-user-status-require/use-require-payment-status';
import { RootState } from '@/src/store';
import { deleteTask } from '@/src/libs/tasks/delete-task';
import { fetchTask } from '@/src/libs/tasks/fetch-task';
import PageLoading from '../../common/page-loading';
import LoadingCircle from '../../atom/loadings/loading-circle';
import ButtonBack from '../../atom/buttons-component/button-back';
import ButtonFreeClass from '../../atom/buttons-component/button-free-class';
import MyIcon from '../../atom/icon-components';
import MyImage from '../../atom/image-components';
import ModalContainer from '../../common/modal-container';
import { Task } from '@/src/types/global';
import ModalBoxComponent from '../../molecule/modal-box';

const MyVideo = lazy(() => import('@/src/components/atom/video-component'));

const LightBoxComponent = lazy(
  () => import('@/src/components/common/light-box')
);

const TaskDetailComponent = () => {
  const navigation = useNavigation();
  const isMobile = useIsMobile();

  useRequireActiveStatus();
  useRequirePaymentStatus();

  const params = useSearchParams();
  const taskId = params.get('taskId');

  const tasks = useSelector((state: RootState) => state?.tasks?.tasks);

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [modalCounter, setModalCounter] = useState<number>(0);

  const fetchTaskHandler = async () => {
    const data = await fetchTask({ taskId: taskId! });

    setTask(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!taskId) return;

    const foundTask = tasks?.find((task: Task) => task?.id === taskId);

    const operationTask = () => {
      if (foundTask) {
        setTask(foundTask);

        setLoading(false);
      } else {
        fetchTaskHandler();
      }
    };

    operationTask();
  }, [taskId, tasks]);

  const deleteTaskHandler = async () => {
    if (!taskId) return;

    try {
      setDeleting(true);

      await deleteTask({ taskId: taskId! });

      enqueueSnackbar(`Todo delted successfully`, {
        variant: 'success',
      });

      navigation.dashboard();
    } catch (error: any) {
      enqueueSnackbar(`Error: ${error?.message || error}. Please try again.`, {
        variant: 'error',
      });

      setDeleting(false);
    } finally {
      setDeleting(false);
    }
  };

  const handleOpenModal = (modalNumber: number) => {
    setModalCounter(modalNumber);

    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const BackDashboard = () => {
    navigation.dashboard();
  };

  if (loading) return <PageLoading />;
  if (!task) return <div>Task not found</div>;

  return (
    <>
      <div className="flex w-full flex-col items-start justify-center">
        <div className="h-full w-full rounded-xl border border-gray-300 bg-white p-4 shadow-md">
          <div className="mb-4 flex items-center justify-between lg:mb-2">
            <ButtonBack onClick={BackDashboard} />

            <ButtonFreeClass
              onClick={() => handleOpenModal(1)}
              isLoading={deleting}
              disable={deleting}
              icon={
                <MyIcon
                  icon="delete"
                  className="z-50 text-h4 text-error-500 hover:text-error-700"
                />
              }
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-4 lg:flex-row">
            <div className="w-[90vw] p-4 lg:w-full">
              <div className="flex flex-col justify-between lg:mb-4 lg:w-[500px] lg:flex-row">
                <p className="mb-4 font-semibold capitalize text-gray-600">
                  <span className="mr-2 text-body font-bold text-gray-800">
                    Status:
                  </span>
                  {task.status}
                </p>

                <p className="mb-4 font-semibold capitalize text-gray-600">
                  <span className="mr-2 text-body font-bold text-gray-800">
                    Tag:
                  </span>
                  {task.tag}
                </p>

                <p className="mb-4 font-semibold capitalize text-gray-600">
                  <span className="mr-2 text-body font-bold text-gray-800">
                    Created Date:
                  </span>
                  {task.createdAt}
                </p>
              </div>

              <div className="rounded-md border border-gray-300 bg-gray-50 p-4 shadow-md">
                <h1 className="mb-4 break-words text-body font-semibold text-gray-800">
                  {task.title}
                </h1>

                <hr className="border border-dashed border-gray-300" />

                <p className="mb-8 mt-4 break-words text-body text-gray-600">
                  {task.description}
                </p>

                {task?.attachment?.fileUrl && (
                  <div
                    onClick={() => handleOpenModal(2)}
                    className="cursor-pointer text-label text-primary-500"
                  >
                    This task has an attachment. click to show
                  </div>
                )}
              </div>
            </div>

            <MyImage
              src="/images/todo-detail.svg"
              alt=""
              width={isMobile ? 300 : 400}
              height={isMobile ? 300 : 400}
              className="object-contain"
              wrapperClass="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] flex items-center justify-center"
            />
          </div>
        </div>
      </div>

      <ModalContainer open={open} handleClose={handleCloseModal}>
        {modalCounter === 1 ? (
          <ModalBoxComponent
            isDelete
            handleClose={handleCloseModal}
            clickHandler={deleteTaskHandler}
            title={`Are you sure you want to delete this task?`}
            description={task.title}
          />
        ) : modalCounter === 2 ? (
          <div className="w-full max-w-[500px] pt-8">
            {task.attachment?.fileType ? (
              task.attachment?.fileType === 'image' ? (
                <Suspense
                  fallback={
                    <div className="flex h-full w-full items-center justify-center">
                      <LoadingCircle size={40} />
                    </div>
                  }
                >
                  <LightBoxComponent url={task?.attachment?.fileUrl as string}>
                    <div className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-md border border-gray-300">
                      <MyImage
                        src={task?.attachment?.fileUrl as string}
                        alt={task?.attachment?.fileUrl as string}
                        fill
                        wrapperClass="w-full h-full"
                        className="object-contain"
                      />
                    </div>
                  </LightBoxComponent>
                </Suspense>
              ) : (
                <div className="aspect-square w-full max-w-[500px] rounded-md border border-gray-300">
                  <Suspense
                    fallback={
                      <div className="flex h-full w-full items-center justify-center">
                        <LoadingCircle size={40} />
                      </div>
                    }
                  >
                    <MyVideo
                      src={task?.attachment?.fileUrl as string}
                      alt={task?.attachment?.fileUrl as string}
                      className="h-full w-full rounded-md object-contain"
                    />
                  </Suspense>
                </div>
              )
            ) : null}
          </div>
        ) : null}
      </ModalContainer>
    </>
  );
};

export default TaskDetailComponent;
