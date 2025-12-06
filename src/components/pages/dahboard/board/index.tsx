"use client";

import {
  ColumnComponent,
  DndContext,
  DragEndEvent,
  PointerSensor,
  RootState,
  Task,
  TaskCardComponent,
  TouchSensor,
  updateTaskStatus,
  useSelector,
  useSensor,
  useSensors,
} from "../imports";

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

  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filters = useSelector((state: RootState) => state.filters);

  const filteredTasks = tasks.filter((task) => {
    const taskDate = task.createdAt;
    const taskTag = task.tag;

    const tag = filters.tag;
    const from = filters.date.from;
    const to = filters.date.to;

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
      .map((task: Task) => (
        <TaskCardComponent key={task?.id} id={task?.id} task={task} />
      ));
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex flex-col lg:flex-row justify-center gap-4 px-2">
        <ColumnComponent id="todo">{renderColumn("todo")}</ColumnComponent>
        <ColumnComponent id="inprogress">
          {renderColumn("inprogress")}
        </ColumnComponent>
        <ColumnComponent id="done">{renderColumn("done")}</ColumnComponent>
      </div>
    </DndContext>
  );
};

export default BoardComponent;
