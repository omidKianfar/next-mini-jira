"use client";

import ButtonBack from "@/src/components/atom/button/button-back";
import ButtonFreeClass from "@/src/components/atom/button/button-free-class";
import MyIcon from "@/src/components/atom/icon";
import MyImage from "@/src/components/atom/image";
import PageLoading from "@/src/components/organisms/page-loading";
import { useIsMobile } from "@/src/hooks/mobile-size";
import { useNavigation } from "@/src/hooks/navigation";
import { deleteTask } from "@/src/lib/auth/delete-task";
import { fetchTask } from "@/src/lib/tasks/fetch-task";
import { RootState } from "@/src/store";
import { Task } from "@/src/types/global";
import { useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TaskDetailComponent = () => {
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
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
      <div className="h-full w-full rounded-xl border-2 border-amber-300 bg-white p-4 shadow-md lg:h-full">
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
            <div className="mb-4 flex flex-col justify-between lg:mb-8 lg:w-[500px] lg:flex-row">
              <p className="capitalize text-primary-600">
                <span className="text-body font-bold text-black">Status:</span>{" "}
                {task.status}
              </p>

              <p className="capitalize text-primary-600">
                <span className="text-body font-bold text-black">Tag:</span>{" "}
                {task.tag}
              </p>

              <p className="capitalize text-primary-600">
                <span className="text-body font-bold text-black">Created:</span>{" "}
                {task.createdAt}
              </p>
            </div>

            <h1 className="break-word mb-4 text-body font-semibold">
              {task.title}
            </h1>

            <p className="break-word mb-8 mt-2 text-body">{task.description}</p>
          </div>
          <MyImage
            src="/images/todo-detail.svg"
            alt=""
            width={isMobile ? 300 : 400}
            height={isMobile ? 200 : 300}
            className="object-contain"
            wrapperClass="w-[300px] h-[200px] lg:w-[400px] lg:h-[300px] flex items-center justify-center"
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailComponent;
