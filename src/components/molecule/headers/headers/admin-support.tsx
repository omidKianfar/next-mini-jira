'use client';

import MyIcon from '../../../atom/icon-components';
import { ModalProps } from '@/src/types/global';

const AdminSupportHeader = ({
  handleOpenModal,
}: Pick<ModalProps, 'handleOpenModal'>) => {
  return (
    <div className="flex items-center justify-end gap-3 lg:gap-4">
      <button
        onClick={() => handleOpenModal?.(7)}
        className="text-primary-500 transition-colors hover:text-primary-700"
        aria-label="Filter Chats"
      >
        <MyIcon icon="filter" className="text-title lg:text-h3" />
      </button>

      <button
        onClick={() => handleOpenModal?.(6)}
        className="text-primary-500 transition-colors hover:text-primary-700"
        aria-label="Search Chats"
      >
        <MyIcon icon="search" className="text-title lg:text-h3" />
      </button>
    </div>
  );
};

export default AdminSupportHeader;
