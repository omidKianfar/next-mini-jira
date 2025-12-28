"use client";

import { useDraggable } from "@dnd-kit/core";

// hooks
import { useIsMobile } from "@/src/hooks/mobile-size";
import { useNavigation } from "@/src/hooks/navigation";

// ui
import MyIcon from "@/src/components/atom/icon";

// type
import { TaskCardProps } from "@/src/components/pages/type";

// utiles
import { stringSlicer } from "@/src/utils/string-slicer";

export const TaskCardComponent = ({ id, task }: TaskCardProps) => {
  // hooks
  const navigation = useNavigation();
  const isMobile = useIsMobile();

  const { transform, setNodeRef, listeners, attributes } = useDraggable({ id });

  // style
  const baseStyle = {
    transition: "box-shadow-sm 0.2s ease, transform 0.04s linear",
  };

  const style = transform
    ? {
        ...baseStyle,
        transform: `translate(${transform.x}px, ${transform.y}px) scale(1.03)`,
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        zIndex: 50,
      }
    : baseStyle;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex w-full items-center justify-between rounded-lg border-2 border-warning-400 bg-white shadow-md"
    >
      <div className="w-full p-1">
        <div
          className="cursor-grab rounded-lg border border-gray-300 bg-gray-50 shadow-md"
          {...listeners}
          {...attributes}
        >
          <div className="p-2">
            <p className="break-word text-bodySm font-bold">
              {stringSlicer({ string: task.title, slice: isMobile ? 50 : 100 })}
            </p>
          </div>

          <hr className="border border-dashed border-gray-300 mx-2" />

          <p className="break-words p-2 text-bodySm">
            {stringSlicer({
              string: task.description,
              slice: isMobile ? 100 : 200,
            })}
          </p>
        </div>

        <div className="flex items-center justify-between rounded-b-lg px-2 pb-1 pt-2">
          <MyIcon
            icon={
              task.tag == "bug"
                ? "solar:bug-bold-duotone"
                : "material-symbols:task"
            }
            className="mr-2 text-title text-warning-500"
          />

          <div data-no-dnd="true">
            <MyIcon
              icon={"maki:arrow"}
              className="cursor-pointer text-subtitle text-warning-500 hover:text-blue-500"
              onClick={() => navigation.taskDetail(task.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCardComponent;
