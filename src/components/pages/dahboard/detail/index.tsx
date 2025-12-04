"use client";

import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState, Task } from "../imports";
import { useEffect, useState } from "react";
import { fetchTask } from "@/src/lib/tasks/fetch-task";
import PageLoading from "@/src/components/atom/loading/page-loader";

const TaskDetailComponent = () => {
  const params = useSearchParams();
  const taskId = params.get("taskId");

  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTaskHandler = async () => {
    const data = await fetchTask({ taskId: taskId! });

    setTask(data);

    setLoading(false);
  };

  useEffect(() => {
    if (!taskId) return;

    const foundTask = tasks.find((task) => task.id === taskId);

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

  if (loading) return <PageLoading />;
  if (!task) return <div>Task not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">{task.title}</h1>
      <p className="mt-2">{task.description}</p>

      <div className="mt-4 text-gray-500 text-sm">
        <div>Status: {task.status}</div>
        <div>Tag: {task.tag}</div>
        <div>Created: {task.createdAt}</div>
      </div>
    </div>
  );
};

export default TaskDetailComponent;
