"use client";

import { lazy, Suspense } from "react";
import { RootState } from "@/src/store";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

// firestore
import { updateTaskStatus } from "@/src/lib/tasks/update-task-status";

// type
import { Task } from "@/src/types/global";

// ui
import PageLoading from "../page-loading";

// lazy
const ColumnComponent = lazy(() => import("./column"));
const TaskCardComponent = lazy(() => import("./task"));

const BoardComponent = () => {
  // mobile config
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
  );

  // redux states
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const taskFilters = useSelector((state: RootState) => state.taskFilters);

  // functions
  const filteredTasks = tasks.filter((task) => {
    const taskDate = task.createdAt;
    const taskTag = task.tag;

    const tag = taskFilters.tag;
    const from = taskFilters.date.from;
    const to = taskFilters.date.to;

    if (tag && tag !== "all") {
      if (taskTag !== tag) return false;
    }
    if (from && taskDate < from) return false;

    if (to && taskDate > to) return false;

    return true;
  });

  const finalTasks = filteredTasks;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    updateTaskStatus({ id: taskId as string, status: newStatus as string });
  };

  const renderColumn = (status: string) => {
    return finalTasks
      .filter((task: Task) => task?.status === status)
      .sort(
        (a, b) =>
          dayjs(b.updatedAt ?? 0).valueOf() - dayjs(a.updatedAt ?? 0).valueOf(),
      )
      .map((task: Task) => (
        <TaskCardComponent key={task?.id} id={task?.id} task={task} />
      ));
  };

  return (
    <Suspense fallback={<PageLoading />}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex flex-col items-start justify-center gap-4 px-4 py-1 lg:flex-row">
          <ColumnComponent key="todo" id="todo">
            {renderColumn("todo") ?? []}
          </ColumnComponent>

          <ColumnComponent key="inprogress" id="inprogress">
            {renderColumn("inprogress") ?? []}
          </ColumnComponent>

          <ColumnComponent key="done" id="done">
            {renderColumn("done") ?? []}
          </ColumnComponent>
        </div>
      </DndContext>
    </Suspense>
  );
};

export default BoardComponent;
