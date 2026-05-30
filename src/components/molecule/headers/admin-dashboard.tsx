'use client';

import MyIcon from '../../atom/icon-components';
import { ModalProps } from '@/src/types/global';

const AdminDashboardHeader = ({
  handleOpenModal,
}: Pick<ModalProps, 'handleOpenModal'>) => {
  return (
    <div className="flex items-center justify-end">
      <MyIcon
        icon="filter"
        className="mr-2 cursor-pointer text-title text-primary-500 hover:text-primary-700 lg:mr-3 lg:text-h3"
        onClick={() => handleOpenModal?.(5)}
      />

      <MyIcon
        icon="search"
        className="mr-2 cursor-pointer text-title text-primary-500 hover:text-primary-700 lg:mr-4 lg:text-h3"
        onClick={() => handleOpenModal?.(4)}
      />
    </div>
  );
};

export default AdminDashboardHeader;
