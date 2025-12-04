import { Icon } from "@iconify/react";
import { useDraggable, useRouter } from "../../imports";
import { TaskCardProps } from "../type";

export const TaskCardComponent = ({ id, task }: TaskCardProps) => {
  const router = useRouter();
  const { transform, setNodeRef, listeners, attributes } = useDraggable({ id });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-3 bg-white border-2 border-blue-300 rounded-lg mb-2  flex justify-between items-center"
    >
      <div
        className="w-[95%] flex justify-start items-center cursor-grab "
        {...listeners}
        {...attributes}
      >
        <Icon
          icon={
            task.tag == "bug"
              ? "solar:bug-bold-duotone"
              : "material-symbols:task"
          }
          className="mr-1 text-amber-500 text-2xl"
        />

        <p>{task.title}</p>
      </div>

      <div className="w-[5%] ">
        <Icon
          data-no-dnd="true"
          icon="grommet-icons:link-next"
          width={20}
          className="hover:text-red-500 cursor-pointer text-amber-500"
          onClick={() => router.push(`/dashboard/task-detail?taskId=${task.id}`)}
        />
      </div>
    </div>
  );
};

export default TaskCardComponent;
