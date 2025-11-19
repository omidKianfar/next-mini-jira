import React from "react";
import BoardComponent from "../board";
import AddTaskFormComponent from "../board/add-task-form";

const DashboardComponent = () => {
  return (
    <div className="p-4">
      <AddTaskFormComponent />
      <BoardComponent />
    </div>
  );
};

export default DashboardComponent;
