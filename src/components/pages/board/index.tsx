"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useState } from "react";

const BoardComponent = () => {
  const sensors = useSensors(useSensor(PointerSensor));

  const [columns, setColumns] = useState({
    todo: [],
    inprogress: [],
    done: [],
  });

  const handleDragEnd = (event: DragEndEvent) => {
    console.log("event", event);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 p-4 overflow-x-auto">
        {Object.entries(columns).map(([colName, colTask]) => (
          <SortableContext
            key={colName}
            items={colTask.map((task) => task?.id)}
            strategy={verticalListSortingStrategy}
          >
            Column
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
};

export default BoardComponent;
