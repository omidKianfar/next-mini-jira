"use client";

import {
  MyIcon,
  stringSlicer,
  useDraggable,
  useIsMobile,
  useRouter,
} from "../../../imports";
import { TaskCardProps } from "../../../type";

export const TaskCardComponent = ({ id, task }: TaskCardProps) => {
  const router = useRouter();

  const isMobile = useIsMobile();

  const { transform, setNodeRef, listeners, attributes } = useDraggable({ id });

  const baseStyle = {
    transition: "box-shadow 0.2s ease, transform 0.04s linear",
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
      className="w-full bg-white border-2 border-amber-400 rounded-lg mb-2 
       flex justify-between items-center shadow"
    >
      <div className="w-full">
        <div
          className="flex justify-between items-center p-1 bg- rounded-t-lg
          bg-gradient-to-r  from-amber-500 via-amber-400 to-amber-500"
        >
          <MyIcon
            icon={
              task.tag == "bug"
                ? "solar:bug-bold-duotone"
                : "material-symbols:task"
            }
            className="mr-1 text-white text-2xl"
          />

          <div data-no-dnd="true">
            <MyIcon
              icon={"carbon:task-view"}
              className="cursor-pointer text-white hover:text-blue-500 text-2xl"
              onClick={() =>
                router.push(`/dashboard/task-detail?taskId=${task.id}`)
              }
            />
          </div>
        </div>

        <div className="cursor-grab p-2" {...listeners} {...attributes}>
          <p className="wrap-break-word font-bold mb-2 text-blue-500">
            {stringSlicer({ string: task.title, slice: isMobile ? 25 : 50 })}
          </p>

          <p className="wrap-break-word text-sm">
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
