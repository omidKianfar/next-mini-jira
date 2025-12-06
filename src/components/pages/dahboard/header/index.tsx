import React, { useState } from "react";
import { AddTaskFormComponent, Button, Icon, ModalContainer } from "../imports";
import SearchTasks from "@/src/components/atom/serach";
import FilterTask from "@/src/components/atom/filters";

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
      <div className="flex flex-row-reverse justify-between items-center mb-4 bg-white px-4 py-2 backdrop-blur-md shadow sticky top-0">
        <div className="w-[120px] flex justify-between items-center ">
          <div
            onClick={() => handleOpenModal(3)}
            className="text-blue-500 hover:text-blue-700 text-3xl cursor-pointer"
          >
            <Icon icon={"line-md:filter-twotone"} />
          </div>

          <div
            onClick={() => handleOpenModal(2)}
            className="text-blue-500 hover:text-blue-700 text-3xl cursor-pointer"
          >
            <Icon icon={"line-md:search-twotone"} />
          </div>

          <Button
            onClick={() => handleOpenModal(1)}
            icon={
              <Icon
                icon="hugeicons:task-add-01"
                className="text-3xl text-blue-500 hover:text-blue-700"
              />
            }
          ></Button>
        </div>
      </div>

      <ModalContainer open={open} handleClose={handleCloseModal}>
        {modalcounter == 1 ? (
          <AddTaskFormComponent handleClose={handleCloseModal} />
        ) : modalcounter == 2 ? (
          <div className="mt-8">
            <SearchTasks handleClose={handleCloseModal} />
          </div>
        ) : modalcounter == 3 ? (
          <div className="mt-8">
            <FilterTask handleClose={handleCloseModal} />
          </div>
        ) : null}
      </ModalContainer>
    </>
  );
};

export default DashboardHeader;
