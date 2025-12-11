"use client";

import MyIcon from "@/src/components/atom/icon";
import { TaskCardProps } from "@/src/components/pages/type";
import { stringSlicer } from "@/src/components/utils/string-slicer";
import { useIsMobile } from "@/src/hooks/mobile-size";
import { useNavigation } from "@/src/hooks/navigation";
import { useDraggable } from "@dnd-kit/core";

export const TaskCardComponent = ({ id, task }: TaskCardProps) => {
  const navigation = useNavigation();
  const isMobile = useIsMobile();

  const { transform, setNodeRef, listeners, attributes } = useDraggable({ id });

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
      className="mb-2 flex w-full items-center justify-between rounded-lg border-2 border-warning-400 bg-white shadow-md"
    >
      <div className="w-full">
        <div className="cursor-grab" {...listeners} {...attributes}>
          <div className="rounded-t-lg bg-gradient-to-r from-warning-400 via-warning-300 to-warning-400 p-2 shadow-md">
            <p className="break-word text-bodySm font-bold">
              {stringSlicer({ string: task.title, slice: isMobile ? 45 : 90 })}
            </p>
          </div>

          <p className="break-words p-2 text-bodySm">
            {stringSlicer({
              string: task.description,
              slice: isMobile ? 90 : 180,
            })}
          </p>
        </div>
        <div className="flex items-center justify-between rounded-b-lg bg-gradient-to-r from-warning-400 via-warning-300 to-warning-400 px-2 py-1">
          <MyIcon
            icon={
              task.tag == "bug"
                ? "solar:bug-bold-duotone"
                : "material-symbols:task"
            }
            className="mr-2 text-title text-white"
          />

          <div data-no-dnd="true">
            <MyIcon
              icon={"grommet-icons:link-next"}
              className="cursor-pointer text-subtitle text-white hover:text-blue-500"
              onClick={() => navigation.taskDetail(task.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCardComponent;
