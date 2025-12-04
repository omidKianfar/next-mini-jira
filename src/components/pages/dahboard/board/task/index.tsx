import { Icon } from "@iconify/react";
import { useDraggable, useRouter } from "../../imports";
import { TaskCardProps } from "../type";
import { stringSlicer } from "@/src/components/atom/string-slicer";

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
      className=" p-3 bg-white border-2 border-blue-300 rounded-lg mb-2  flex justify-between items-center"
    >
      <div
        className="w-[93%] flex justify-start items-center cursor-grab pr-1"
        {...listeners}
        {...attributes}
      >
        <div>
          <Icon
            icon={
              task.tag == "bug"
                ? "solar:bug-bold-duotone"
                : "material-symbols:task"
            }
            className="mr-1 text-amber-500 text-2xl"
          />
        </div>

        <div>
          <p className="break-all">{stringSlicer({ string: task.title, slice: 50 })}</p>
          <p className="break-all">
            {stringSlicer({ string: task.description, slice: 100 })}
          </p>
        </div>
      </div>

      <div className="w-[7%] ">
        <Icon
          data-no-dnd="true"
          icon="grommet-icons:link-next"
          width={24}
          className=" cursor-pointer text-amber-500 hover:text-amber-700 "
          onClick={() =>
            router.push(`/dashboard/task-detail?taskId=${task.id}`)
          }
        />
      </div>
    </div>
  );
};

export default TaskCardComponent;
