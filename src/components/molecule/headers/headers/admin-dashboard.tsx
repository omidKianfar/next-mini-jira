'use client';

import MyIcon from '../../../atom/icon-components';
import { ModalProps } from '@/src/types/global';

const AdminDashboardHeader = ({
  handleOpenModal,
}: Pick<ModalProps, 'handleOpenModal'>) => {
  return (
    <div className="flex items-center justify-end gap-3 lg:gap-4">
      <button
        onClick={() => handleOpenModal?.(5)}
        className="text-primary-500 transition-colors hover:text-primary-700"
        aria-label="Filter Users"
      >
        <MyIcon icon="filter" className="text-title lg:text-h3" />
      </button>

      <button
        onClick={() => handleOpenModal?.(4)}
        className="text-primary-500 transition-colors hover:text-primary-700"
        aria-label="Search Users"
      >
        <MyIcon icon="search" className="text-title lg:text-h3" />
      </button>
    </div>
  );
};

export default AdminDashboardHeader;
