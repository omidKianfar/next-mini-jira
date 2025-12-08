"use client";

import { useState } from "react";
import SearchTasks from "@/src/components/atom/serach";
import FilterTask from "@/src/components/atom/filters";
import ModalContainer from "@/src/components/atom/modal";
import AddTaskFormComponent from "@/src/components/pages/dahboard/add-task";
import MyIcon from "@/src/components/atom/icon";

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
      <div className="h-[60px] lg:h-[80px] backdrop-blur-lg bg-white/20 border border-white/30 sticky top-0 shadow-lg mb-4 flex flex-row justify-between items-center px-4">
        <MyIcon
          icon={"mingcute:menu-fill"}
          className="text-blue-500 hover:text-blue-700 text-2xl lg:text-3xl cursor-pointer mr-2 lg:mr-3"
        />

        <div className=" flex justify-center items-center  py-2 ">
          <h1 className="text-lg lg:text-2xl  font-bold text-amber-500 pr-1 p-1">
            Mini
          </h1>

          <h1 className="text-2xl  font-bold font-inter bg-blue-900 text-white  px-2  rounded-sm">
            Jira
          </h1>
        </div>

        <div className=" flex justify-end items-center ">
          <MyIcon
            icon={"line-md:filter-twotone"}
            className="text-blue-500 hover:text-blue-700 text-2xl lg:text-3xl cursor-pointer mr-2 lg:mr-3"
            onClick={() => handleOpenModal(3)}
          />

          <MyIcon
            icon={"line-md:search-twotone"}
            className="text-blue-500 hover:text-blue-700 text-2xl lg:text-3xl cursor-pointer mr-2 lg:mr-4"
            onClick={() => handleOpenModal(2)}
          />

          <MyIcon
            icon={"hugeicons:task-add-01"}
            className="text-2xl lg:text-3xl text-blue-500 hover:text-blue-700"
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
