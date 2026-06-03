'use client';

import { ChangeEvent, lazy, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import EmptyColumn from '@/src/components/atom/empty-components/empty-column';
import MyIcon from '@/src/components/atom/icon-components';
import { ModalProps, Task } from '@/src/types/global';

const TaskCardComponent = lazy(
  () => import('@/src/components/molecule/cards/task-card')
);

const SearchTasks = ({ handleClose }: Pick<ModalProps, 'handleClose'>) => {
  const tasks = useSelector((state: RootState) => state?.tasks?.tasks);

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const serachHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as string;
    setSearchValue(value);

    if (!value.trim()) {
      setFilteredTasks([]);
      setOpenMenu(false);
      return;
    }

    const query = value?.toLowerCase();

    const filtered = tasks?.filter((task) => {
      const title = task?.title?.toLowerCase() || '';
      const description = task?.description?.toLowerCase() || '';

      return title?.includes(query) || description?.includes(query);
    });

    setFilteredTasks(filtered);
    setOpenMenu(true);
  };

  const handelClear = () => {
    setSearchValue('');
    setFilteredTasks([]);
    setOpenMenu(false);
  };

  return (
    <div className="w-full">
      <h1 className="mb-4 text-subtitle font-bold text-primary-500">
        Search Tasks
      </h1>

      <div className="relative mb-4">
        <div>
          <MyIcon
            icon="search"
            className="absolute left-2 top-[15px] text-subtitle text-gray-300"
          />

          {filteredTasks.length > 0 && (
            <MyIcon
              icon="close"
              className="absolute right-2 top-[14px] cursor-pointer text-subtitle text-gray-400 hover:text-error-500"
              onClick={handelClear}
            />
          )}

          <input
            className="my-1 w-full rounded-md border-2 border-primary-500 px-8 py-2 text-bodySm text-gray-600 focus:outline-primary-700"
            value={searchValue}
            onChange={(event) => serachHandler(event)}
            autoFocus
          />
        </div>
      </div>

      {openMenu ? (
        filteredTasks.length > 0 ? (
          <div className="scrollbar-hide mt-4 max-h-80 overflow-y-auto">
            {filteredTasks.map((task) => (
              <div key={task.id} className="mb-4 last:mb-2">
                <TaskCardComponent
                  id={task.id}
                  task={task}
                  modal
                  handleClose={handleClose}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-2">
            <EmptyColumn />
          </div>
        )
      ) : null}
    </div>
  );
};

export default SearchTasks;
