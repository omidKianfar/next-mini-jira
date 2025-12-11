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
      className="mb-2 flex w-full items-center justify-between rounded-xl border-2 border-warning-400 bg-white shadow-sm"
    >
      <div className="w-full">
        <div className="bg- flex items-center justify-between rounded-t-xl bg-gradient-to-r from-warning-500 via-warning-400 to-warning-500 p-1">
          <MyIcon
            icon={
              task.tag == "bug"
                ? "solar:bug-bold-duotone"
                : "material-symbols:task"
            }
            className="mr-1 text-title text-white"
          />

          <div data-no-dnd="true">
            <MyIcon
              icon={"carbon:task-view"}
              className="cursor-pointer text-title text-white hover:text-primary-500"
              onClick={() => navigation.taskDetail(task.id)}
            />
          </div>
        </div>

        <div className="cursor-grab p-2" {...listeners} {...attributes}>
          <p className="wrap-break-word mb-2 font-bold text-primary-500">
            {stringSlicer({ string: task.title, slice: isMobile ? 25 : 50 })}
          </p>

          <p className="wrap-break-word text-bodySm">
            {stringSlicer({
              string: task.description,
              slice: isMobile ? 50 : 100,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskCardComponent;
