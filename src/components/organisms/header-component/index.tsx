'use client';

import { lazy, Suspense, useState } from 'react';

import Logo from '../../atom/logo-component';
import LoadingCircle from '../../atom/loadings/loading-circle';
import ModalContainer from '../../common/modal-container';
import LeftSideHeaders from './left-side-headers';
import RightSideHeaders from './right-side-headers';
import { HeaderProps } from '@/src/types/global';

const AddTask = lazy(() => import('../modals/add-task-modal'));
const SearchTasks = lazy(() => import('../modals/serach-modals/search-tasks'));
const FilterTask = lazy(() => import('../modals/filter-modals/tasks'));
const SearchUsers = lazy(() => import('../modals/serach-modals/serach-users'));
const FilterUsers = lazy(() => import('../modals/filter-modals/users'));
const SearchSupportChats = lazy(
  () => import('../modals/serach-modals/search-support-chats')
);
const FilterChats = lazy(() => import('../modals/filter-modals/chats'));

const Header = ({ showSidebar, setShowSidebar }: HeaderProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [modalCounter, setModalCounter] = useState<number>(0);

  const handleOpenModal = (modalNumber: number) => {
    setModalCounter(modalNumber);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const renderModalContent = () => {
    switch (modalCounter) {
      case 1:
        return <AddTask handleClose={handleCloseModal} />;
      case 2:
        return <SearchTasks handleClose={handleCloseModal} />;
      case 3:
        return <FilterTask handleClose={handleCloseModal} />;
      case 4:
        return <SearchUsers handleClose={handleCloseModal} />;
      case 5:
        return <FilterUsers handleClose={handleCloseModal} />;
      case 6:
        return <SearchSupportChats handleClose={handleCloseModal} />;
      case 7:
        return <FilterChats handleClose={handleCloseModal} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="sticky top-0 z-50 flex h-[60px] flex-row items-center justify-between border border-white/30 bg-white/20 px-4 shadow-lg backdrop-blur-md lg:h-[80px]">
        <LeftSideHeaders
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />

        <div className="flex w-1/3 items-center justify-center">
          <Logo small />
        </div>

        <RightSideHeaders handleOpenModal={handleOpenModal} />
      </div>

      <Suspense fallback={<LoadingCircle />}>
        <ModalContainer open={open} handleClose={handleCloseModal}>
          {renderModalContent()}
        </ModalContainer>
      </Suspense>
    </>
  );
};

export default Header;
