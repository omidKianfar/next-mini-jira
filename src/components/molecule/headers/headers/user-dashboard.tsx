'use client';

import MyIcon from '../../../atom/icon-components';
import { ModalProps } from '@/src/types/global';

const DashboardHeader = ({
  handleOpenModal,
}: Pick<ModalProps, 'handleOpenModal'>) => {
  return (
    <div className="flex items-center justify-end gap-3 lg:gap-4">
      <button
        onClick={() => handleOpenModal?.(3)}
        className="text-primary-500 transition-colors hover:text-primary-700"
        aria-label="Filter Tasks"
      >
        <MyIcon icon="filter" className="text-title lg:text-h3" />
      </button>

      <button
        onClick={() => handleOpenModal?.(2)}
        className="text-primary-500 transition-colors hover:text-primary-700"
        aria-label="Search Tasks"
      >
        <MyIcon icon="search" className="text-title lg:text-h3" />
      </button>

      <button
        onClick={() => handleOpenModal?.(1)}
        className="text-primary-500 transition-colors hover:text-primary-700"
        aria-label="Add Task"
      >
        <MyIcon icon="add-task" className="text-title lg:text-h3" />
      </button>
    </div>
  );
};

export default DashboardHeader;
