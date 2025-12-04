"use client";

import {
  BackButton,
  Button,
  deleteTask,
  fetchTask,
  Icon,
  Image,
  PageLoading,
  RootState,
  Task,
  useEffect,
  useIsMobile,
  useRouter,
  useSearchParams,
  useSelector,
  useState,
} from "../imports";

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

    setDeleting(true);

    await deleteTask({ taskId: taskId! });

    router.push("/dashboard");
  };

  const BackDashboard = () => {
    router.push("/dashboard");
  };

  if (loading) return <PageLoading />;
  if (!task) return <div>Task not found</div>;

  return (
    <div className="p-6 w-full  h-full flex flex-col justify-center items-center overflow-y-auto">
      <div className="text-center mb-4 lg:mb-8  rounded-lg flex mt-4 lg:mt-0">
        <h1 className="text-4xl lg:text-6xl font-bold text-amber-500 pr-1 p-1">
          Mini
        </h1>

        <h1 className="text-4xl lg:text-6xl font-bold  bg-blue-900 text-white px-2 lg:px-6 py-1 rounded-lg">
          Jira
        </h1>
      </div>

      <div className="border-2 rounded-lg p-4 border-amber-300 bg-white">
        <div className="flex justify-between items-center mb-8">
          <BackButton onClick={BackDashboard} />

          <Button
            onClick={deleteTaskHandler}
            isLoading={deleting}
            icon={
              <Icon
                icon={"mingcute:delete-fill"}
                className="text-3xl text-red-500 hover:text-red-700"
              />
            }
          ></Button>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
          <div className="w-[90vw] lg:w-[500px]  ">
            <h1 className="text-xl font-semibold break-all mb-8">
              {task.title}
            </h1>
            <p className="mt-2 break-all mb-8">{task.description}</p>

            <div className="mb-8">Status: {task.status}</div>
            <div className="mb-8">Tag: {task.tag}</div>
            <div className="mb-8">Created: {task.createdAt}</div>
          </div>

          <div className="w-[300px] h-[200px] lg:w-[400px] lg:h-[300px] flex items-center justify-center">
            <Image
              src="/images/todo-detail.svg"
              alt=""
              width={isMobile ? 300 : 500}
              height={isMobile ? 200 : 400}
              className="object-contain"
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailComponent;
