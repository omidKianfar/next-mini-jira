'use client';

import { lazy, Suspense, useState } from 'react';

import Logo from '../../atom/logo-component';
import LoadingCircle from '../../atom/loadings/loading-circle';
import ModalContainer from '../../common/modal-container';
import LeftSideHeaders from '../../molecule/headers/left-side-headers';
import RightSideHeaders from '../../molecule/headers/right-side-headers';
import FilterChats from '../modals/filter-modals/chats';
import SearchSupportChats from '../modals/serach-modals/search-support-chats';
import { HeaderProps } from '@/src/types/global';

const AddTask = lazy(() => import('../modals/add-task-modal'));
const SearchTasks = lazy(() => import('../modals/serach-modals/search-tasks'));
const FilterTask = lazy(() => import('../modals/filter-modals/tasks'));
const SearchUsers = lazy(() => import('../modals/serach-modals/serach-users'));
const FilterUsers = lazy(() => import('../modals/filter-modals/users'));

const Header = ({ showSidebar, setShowSidebar }: HeaderProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [modalcounter, setModalCounter] = useState<number>(0);

  const handleOpenModal = (modalNumber: number) => {
    setModalCounter(modalNumber);

    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
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
          {modalcounter == 1 ? (
            <AddTask handleClose={handleCloseModal} />
          ) : modalcounter == 2 ? (
            <div>
              <SearchTasks handleClose={handleCloseModal} />
            </div>
          ) : modalcounter == 3 ? (
            <div>
              <FilterTask handleClose={handleCloseModal} />
            </div>
          ) : modalcounter == 4 ? (
            <div>
              <SearchUsers handleClose={handleCloseModal} />
            </div>
          ) : modalcounter == 5 ? (
            <div>
              <FilterUsers handleClose={handleCloseModal} />
            </div>
          ) : modalcounter == 6 ? (
            <div>
              <SearchSupportChats handleClose={handleCloseModal} />
            </div>
          ) : modalcounter == 7 ? (
            <div>
              <FilterChats handleClose={handleCloseModal} />
            </div>
          ) : null}
        </ModalContainer>
      </Suspense>
    </>
  );
};

export default Header;
