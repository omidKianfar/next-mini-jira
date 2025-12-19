"use client";

import ButtonBack from "@/src/components/atom/button/button-back";
import ButtonFreeClass from "@/src/components/atom/button/button-free-class";
import MyIcon from "@/src/components/atom/icon";
import MyImage from "@/src/components/atom/image";
import MyVideo from "@/src/components/atom/video";
import LightBoxComponent from "@/src/components/molecule/light-box";
import PageLoading from "@/src/components/organisms/page-loading";
import { useIsMobile } from "@/src/hooks/mobile-size";
import { useNavigation } from "@/src/hooks/navigation";
import { useRequireActiveStatus } from "@/src/hooks/pages-user-status-require/use-require-active-status";
import { useRequirePaymentStatus } from "@/src/hooks/pages-user-status-require/use-require-payment-status";
import { deleteTask } from "@/src/lib/auth/delete-task";
import { fetchTask } from "@/src/lib/tasks/fetch-task";
import { RootState } from "@/src/store";
import { Task } from "@/src/types/global";
import { useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TaskDetailComponent = () => {
  useRequireActiveStatus();
  useRequirePaymentStatus();

  const navigation = useNavigation();

  const params = useSearchParams();
  const taskId = params.get("taskId");

  const isMobile = useIsMobile();

  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<boolean>(false);

  const fetchTaskHandler = async () => {
    const data = await fetchTask({ taskId: taskId! });

    setTask(data);

    setLoading(false);
  };

  useEffect(() => {
    if (!taskId) return;

    const foundTask = tasks.find((task: Task) => task.id === taskId);

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
        variant: "success",
      });

      navigation.dashboard();
    } catch (error: any) {
      enqueueSnackbar(`Error: ${error?.message || error}. Please try again.`, {
        variant: "error",
      });

      setDeleting(false);
    } finally {
      setDeleting(false);
    }
  };

  const BackDashboard = () => {
    navigation.dashboard();
  };

  if (loading) return <PageLoading />;
  if (!task) return <div>Task not found</div>;

  return (
    <div className="flex w-full flex-col items-start justify-center p-4">
      <div className="h-full w-full rounded-xl border-2 border-amber-300 bg-white p-4 shadow-md">
        <div className="mb-4 flex items-center justify-between lg:mb-2">
          <ButtonBack onClick={BackDashboard} />

          <ButtonFreeClass
            onClick={deleteTaskHandler}
            isLoading={deleting}
            disable={deleting}
            icon={
              <MyIcon
                icon={"mingcute:delete-fill"}
                className="z-50 text-h4 text-error-500 hover:text-error-700"
              />
            }
          ></ButtonFreeClass>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 lg:flex-row">
          <div className="w-[90vw] p-4 lg:w-full">
            <div className="flex flex-col justify-between lg:mb-4 lg:w-[500px] lg:flex-row">
              <p className="mb-4 font-semibold capitalize text-primary-600">
                <span className="text-body font-bold text-black">Status:</span>{" "}
                {task.status}
              </p>

              <p className="mb-4 font-semibold capitalize text-primary-600">
                <span className="text-body font-bold text-black">Tag:</span>{" "}
                {task.tag}
              </p>

              <p className="mb-4 font-semibold capitalize text-primary-600">
                <span className="text-body font-bold text-black">Created:</span>{" "}
                {task.createdAt}
              </p>
            </div>

            <div className="rounded-md border border-dashed border-gray-400 bg-gray-50 p-4 shadow-md">
              <h1 className="break-word mb-4 text-body font-semibold">
                {task.title}
              </h1>

              <hr className="border border-dashed border-gray-300" />

              <p className="break-word mb-4 mt-2 text-body">
                {task.description}
              </p>
              <div className="flex items-center justify-center">
                {task.attachment?.fileType ? (
                  task.attachment?.fileType === "image" ? (
                    <LightBoxComponent
                      url={task?.attachment?.fileUrl as string}
                    >
                      <MyImage
                        src={task?.attachment?.fileUrl as string}
                        alt="preview"
                        fill
                        wrapperClass="relative cursor-pointer w-[250px] h-[250px] overflow-hidden rounded-lg p-1 shadow-md border-2 border-gray-100 p-1"
                        className="object-cover"
                      />
                    </LightBoxComponent>
                  ) : (
                    <MyVideo
                      src={task?.attachment?.fileUrl as string}
                      alt="preview"
                      className="w-full max-w-[500px] rounded-lg border-2 border-gray-100 p-1 shadow-md"
                    />
                  )
                ) : null}
              </div>
            </div>
          </div>
          <MyImage
            src="/images/todo-detail.svg"
            alt=""
            width={isMobile ? 300 : 400}
            height={isMobile ? 300 : 400}
            className="object-contain"
            wrapperClass="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] flex items-center justify-center"
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailComponent;
