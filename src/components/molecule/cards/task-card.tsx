'use client';

import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';
import { useNavigation } from '@/src/hooks/navigation/use-navigation';
import { updateTaskStatus } from '@/src/libs/tasks/update-task-status';
import { stringSlicer } from '@/src/utils/string-slicer';
import MyIcon from '../../atom/icon-components';
import { Task } from '@/src/types/global';

interface TaskCardProps {
  id: string;
  task: Task;
  modal?: boolean;
  handleClose?: () => void;
}

const TaskCardComponent = ({ id, task, modal, handleClose }: TaskCardProps) => {
  const navigation = useNavigation();
  const isMobile = useIsMobile();

  const { transform, setNodeRef, listeners, attributes, isDragging } =
    useDraggable({ id });

  const baseStyle = {
    transition: 'box-shadow-sm 0.2s ease, transform 0.04s linear',
  };

  const style =
    transform && !isDragging
      ? {
          ...baseStyle,
          transform: `translate(${transform.x}px, ${transform.y}px) scale(1.03)`,
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          zIndex: 50,
        }
      : baseStyle;

  const changeTaskStatus = (newStatus: string) => {
    updateTaskStatus({ id: id as string, status: newStatus as string });

    handleClose?.();
  };

  const goToDetailTask = () => {
    navigation.taskDetail(task.id);

    handleClose?.();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex w-full items-center justify-between rounded-lg border-2 border-warning-400 bg-white shadow-md transition-opacity duration-75 ${
        isDragging ? 'pointer-events-none opacity-0' : ''
      }`}
    >
      <div className="w-full p-1">
        <div
          className={`${!modal ? 'cursor-grab' : 'cursor-default'} rounded-md border border-gray-300 bg-gray-50 shadow-sm`}
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
              slice: isMobile ? 100 : 150,
            })}
          </p>
        </div>

        <div
          className="flex items-center justify-between p-1 pt-2"
          data-no-dnd="true"
        >
          <MyIcon
            icon={task.tag == 'bug' ? 'bug' : 'task'}
            className="mr-2 text-subtitle text-warning-500"
          />

          <div className="flex items-center justify-end gap-4 px-2 py-1">
            <div className="flex items-center justify-start gap-4">
              {task.status !== 'todo' && (
                <div
                  onClick={() => changeTaskStatus('todo')}
                  title="Move to To Do"
                >
                  <MyIcon
                    icon="todo"
                    className={`cursor-pointer text-subtitle text-primary-400 hover:text-primary-500`}
                  />
                </div>
              )}

              {task.status !== 'inprogress' && (
                <div
                  onClick={() => changeTaskStatus('inprogress')}
                  title="Move to In Progress"
                >
                  <MyIcon
                    icon="progress"
                    className={`cursor-pointer text-subtitle text-primary-400 hover:text-primary-500`}
                  />
                </div>
              )}

              {task.status !== 'done' && (
                <div
                  onClick={() => changeTaskStatus('done')}
                  title="Move to Done"
                >
                  <MyIcon
                    icon="done"
                    className={`cursor-pointer text-subtitle text-primary-400 hover:text-primary-500`}
                  />
                </div>
              )}
            </div>

            <div onClick={goToDetailTask} title="Move to Detail">
              <MyIcon
                icon="arrow-right"
                className="cursor-pointer text-subtitle text-primary-400 hover:text-primary-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCardComponent;
