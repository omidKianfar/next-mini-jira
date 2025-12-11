"use client";

import { useState } from "react";
import MyIcon from "@/src/components/atom/icon";
import ModalContainer from "@/src/components/molecule/modal-component";
import AddTaskFormComponent from "../../add-task";
import SearchTasks from "@/src/components/molecule/serach";
import FilterTask from "@/src/components/molecule/filters";
import Logo from "@/src/components/atom/logo";

const DashboardHeader = () => {
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
      <div className="sticky top-0 mb-4 flex h-[60px] flex-row items-center justify-between border border-white/30 bg-white/20 px-4 shadow-lg backdrop-blur-lg lg:h-[80px]">
        <div className="flex w-1/3 items-center justify-start">
          <MyIcon
            icon={"mingcute:menu-fill"}
            className="cursor-pointer text-title text-primary-500 hover:text-primary-700 lg:text-h3"
          />
        </div>

        <div className="flex w-1/3 items-center justify-center">
          <Logo small />
        </div>

        <div className="flex w-1/3 items-center justify-end">
          <MyIcon
            icon={"line-md:filter-twotone"}
            className="mr-2 cursor-pointer text-title text-primary-500 hover:text-primary-700 lg:mr-3 lg:text-h3"
            onClick={() => handleOpenModal(3)}
          />

          <MyIcon
            icon={"line-md:search-twotone"}
            className="mr-2 cursor-pointer text-title text-primary-500 hover:text-primary-700 lg:mr-4 lg:text-h3"
            onClick={() => handleOpenModal(2)}
          />

          <MyIcon
            icon={"hugeicons:task-add-01"}
            className="text-title text-primary-500 hover:text-primary-700 lg:text-h3"
            onClick={() => handleOpenModal(1)}
          />
        </div>
      </div>

      <ModalContainer open={open} handleClose={handleCloseModal}>
        {modalcounter == 1 ? (
          <AddTaskFormComponent handleClose={handleCloseModal} />
        ) : modalcounter == 2 ? (
          <div>
            <SearchTasks handleClose={handleCloseModal} />
          </div>
        ) : modalcounter == 3 ? (
          <div>
            <FilterTask handleClose={handleCloseModal} />
          </div>
        ) : null}
      </ModalContainer>
    </>
  );
};

export default DashboardHeader;
