"use client";

import { useState } from "react";
import BoardComponent from "../board";
import ModalContainer from "../../atom/modal";
import AddTaskFormComponent from "../board/add-task-form";

const DashboardComponent = () => {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  return (
    <div className="p-4">
      <div>
        <button onClick={handleOpenModal}>Add Task</button>

        <ModalContainer open={open} handleClose={handleCloseModal}>
          <AddTaskFormComponent />
        </ModalContainer>
      </div>

      <BoardComponent />
    </div>
  );
};

export default DashboardComponent;
