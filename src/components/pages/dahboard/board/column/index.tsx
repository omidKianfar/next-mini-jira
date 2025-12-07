"use client";

import { ColumnProps } from "../../../type";
import { Icon, useDroppable } from "../../../imports";

const ColumnComponent = ({ id, children }: ColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`w-full lg:w-80 bg-gray-100  rounded-lg  transition border-2 border-blue-300 shadow-2xl
      ${isOver ? "bg-blue-300" : "bg-white"}
      `}
      style={{
        minHeight: "100%",
        touchAction: "none",
      }}
    >
      <h1
        className="mb-2 text-center capitalize font-bold  text-white
bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500

          rounded-t-lg p-2 shadow flex justify-center items-center gap-2
          "
      >
        {id}
        {id == "todo" ? (
          <Icon icon={"ri:todo-line"} className="text-2xl" />
        ) : id == "inprogress" ? (
          <Icon icon={"carbon:in-progress"} className="text-2xl" />
        ) : (
          <Icon icon={"ant-design:file-done-outlined"} className="text-2xl" />
        )}
      </h1>

      <div className="flex flex-col gap-2 p-2">{children}</div>
    </div>
  );
};

export default ColumnComponent;
