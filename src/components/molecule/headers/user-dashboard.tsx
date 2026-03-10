'use client';

import { ModalProps, MyIcon } from '../imports';

const DashboardHeader = ({
  handleOpenModal,
}: Pick<ModalProps, 'handleOpenModal'>) => {
  return (
    <div className="flex items-center justify-end">
      <MyIcon
        icon="filter"
        className="mr-2 cursor-pointer text-title text-primary-500 hover:text-primary-700 lg:mr-3 lg:text-h3"
        onClick={() => handleOpenModal?.(3)}
      />

      <MyIcon
        icon="search"
        className="mr-2 cursor-pointer text-title text-primary-500 hover:text-primary-700 lg:mr-4 lg:text-h3"
        onClick={() => handleOpenModal?.(2)}
      />

      <MyIcon
        icon="add-task"
        className="cursor-pointer text-title text-primary-500 hover:text-primary-700 lg:text-h3"
        onClick={() => handleOpenModal?.(1)}
      />
    </div>
  );
};

export default DashboardHeader;
