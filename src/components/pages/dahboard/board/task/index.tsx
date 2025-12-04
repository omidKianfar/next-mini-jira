import { Icon } from "@iconify/react";
import { useDraggable, useIsMobile, useRouter } from "../../imports";
import { TaskCardProps } from "../type";
import { stringSlicer } from "@/src/components/atom/string-slicer";

export const TaskCardComponent = ({ id, task }: TaskCardProps) => {
  const router = useRouter();

  const isMobile = useIsMobile();

  const { transform, setNodeRef, listeners, attributes } = useDraggable({ id });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className=" bg-white border-2 border-amber-400 rounded-lg mb-2  flex justify-between items-center shadow"
    >
      <div className="w-full">
        <div className="flex justify-between items-center p-1 bg-amber-500 rounded-t-lg">
          <Icon
            icon={
              task.tag == "bug"
                ? "solar:bug-bold-duotone"
                : "material-symbols:task"
            }
            className="mr-1 text-white text-2xl"
          />

          <div>
            <Icon
              data-no-dnd="true"
              icon="grommet-icons:link-next"
              className=" cursor-pointer text-white hover:text-blue-500 text-2xl"
              onClick={() =>
                router.push(`/dashboard/task-detail?taskId=${task.id}`)
              }
            />
          </div>
        </div>

        <div className="cursor-grab p-2" {...listeners} {...attributes}>
          <p className="wrap-break-word font-bold mb-2">
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
