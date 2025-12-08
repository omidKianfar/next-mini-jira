"use client";

import {
  BackButton,
  Button,
  deleteTask,
  enqueueSnackbar,
  fetchTask,
  Icon,
  Image,
  MyIcon,
  PageLoading,
  RootState,
  Task,
  useEffect,
  useIsMobile,
  useRouter,
  useSearchParams,
  useSelector,
  useState,
} from "../../imports";

const TaskDetailComponent = () => {
  const router = useRouter();

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

      router.push("/dashboard");
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
    router.push("/dashboard");
  };

  if (loading) return <PageLoading />;
  if (!task) return <div>Task not found</div>;

  return (
    <div className="p-6 w-full  h-full flex flex-col justify-center items-center overflow-y-auto">
      <div className="border-2 rounded-lg p-4 border-amber-300 bg-white shadow ">
        <div className="flex justify-between items-center mb-4 lg:mb-2">
          <BackButton onClick={BackDashboard} />

          <Button
            onClick={deleteTaskHandler}
            isLoading={deleting}
            disable={deleting}
            icon={
              <MyIcon
                icon={"mingcute:delete-fill"}
                className="text-3xl text-red-500 hover:text-red-700 z-50"
              />
            }
          ></Button>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
          <div className="w-[90vw] lg:w-[500px]  ">
            <div className="flex justify-between mb-4 lg:mb-8 flex-col lg:flex-row ">
              <p className="text-blue-600 capitalize">
                <span className="font-bold text-black">Status:</span>{" "}
                {task.status}
              </p>

              <p className="text-blue-600 capitalize">
                <span className="font-bold text-black">Tag:</span> {task.tag}
              </p>

              <p className="text-blue-600 capitalize">
                <span className="font-bold text-black">Created:</span>{" "}
                {task.createdAt}
              </p>
            </div>

            <h1 className="text-xl font-semibold wrap-break-word mb-4">
              {task.title}
            </h1>

            <p className="mt-2 wrap-break-word mb-8">{task.description}</p>
          </div>

          <div className="w-[300px] h-[200px] lg:w-[400px] lg:h-[300px] flex items-center justify-center">
            <Image
              src="/images/todo-detail.svg"
              alt=""
              width={isMobile ? 300 : 400}
              height={isMobile ? 200 : 300}
              className="object-contain"
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailComponent;
