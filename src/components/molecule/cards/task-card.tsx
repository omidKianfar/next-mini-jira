'use client';

import {
  MyIcon,
  stringSlicer,
  TaskCardProps,
  useDraggable,
  useIsMobile,
  useNavigation,
} from '../imports';

const TaskCardComponent = ({ id, task }: TaskCardProps) => {
  const navigation = useNavigation();
  const isMobile = useIsMobile();
  const { transform, setNodeRef, listeners, attributes } = useDraggable({ id });

  const baseStyle = {
    transition: 'box-shadow-sm 0.2s ease, transform 0.04s linear',
  };

  const style = transform
    ? {
        ...baseStyle,
        transform: `translate(${transform.x}px, ${transform.y}px) scale(1.03)`,
        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
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
            <p className="break-words text-bodySm font-bold">
              {stringSlicer({ string: task.title, slice: isMobile ? 50 : 100 })}
            </p>
          </div>

          <hr className="mx-2 border border-dashed border-gray-300" />

          <p className="break-words p-2 text-bodySm">
            {stringSlicer({
              string: task.description,
              slice: isMobile ? 100 : 200,
            })}
          </p>
        </div>

        <div className="flex items-center justify-between rounded-b-lg px-2 pb-1 pt-2">
          <MyIcon
            icon={task.tag == 'bug' ? 'bug' : 'task'}
            className="mr-2 text-title text-warning-500"
          />

          <div data-no-dnd="true">
            <MyIcon
              icon="arrow-right"
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
