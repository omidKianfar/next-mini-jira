"use client";

import { useSelector } from "react-redux";
import {
  ColumnComponent,
  DndContext,
  DragEndEvent,
  RootState,
  TaskCardComponent,
  updateTaskStatus,
} from "../imports";

import {
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

const BoardComponent = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    updateTaskStatus({ id: taskId as string, status: newStatus as string });
  };

  const renderColumn = (status: string) => {
    return tasks
      .filter((task) => task?.status === status)
      .map((task) => (
        <TaskCardComponent key={task?.id} id={task?.id} task={task} />
      ));
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex justify-center gap-4 px-2">
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
