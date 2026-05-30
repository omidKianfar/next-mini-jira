'use client';

import { lazy, Suspense } from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { RootState } from '@/src/store';
import { updateTaskStatus } from '@/src/libs/tasks/update-task-status';
import PageLoading from '../../common/page-loading';
import { Task } from '@/src/types/global';

const ColumnComponent = lazy(() => import('./column'));
const TaskCardComponent = lazy(() => import('../../molecule/cards/task-card'));

const BoardComponent = () => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );

  const tasks = useSelector((state: RootState) => state?.tasks?.tasks);
  const taskFilters = useSelector((state: RootState) => state?.taskFilters);

  const filteredTasks = tasks.filter((task) => {
    const taskDate = task.createdAt;
    const taskTag = task.tag;

    const tag = taskFilters?.tag;
    const from = taskFilters?.date?.from;
    const to = taskFilters?.date?.to;

    if (tag && tag !== 'all') {
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
          dayjs(b.updatedAt ?? 0).valueOf() - dayjs(a.updatedAt ?? 0).valueOf()
      )
      .map((task: Task) => (
        <TaskCardComponent key={task?.id} id={task?.id} task={task} />
      ));
  };

  return (
    <Suspense fallback={<PageLoading />}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex flex-col items-start justify-center gap-4 lg:flex-row">
          <ColumnComponent key="todo" id="todo">
            {renderColumn('todo') ?? []}
          </ColumnComponent>

          <ColumnComponent key="inprogress" id="inprogress">
            {renderColumn('inprogress') ?? []}
          </ColumnComponent>

          <ColumnComponent key="done" id="done">
            {renderColumn('done') ?? []}
          </ColumnComponent>
        </div>
      </DndContext>
    </Suspense>
  );
};

export default BoardComponent;
