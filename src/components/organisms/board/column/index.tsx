"use client";

import MyIcon from "@/src/components/atom/icon";
import { ColumnProps } from "@/src/components/pages/type";
import { useDroppable } from "@dnd-kit/core";
import EmptyColumn from "../empty-column";

const ColumnComponent = ({ id, children }: ColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  const ChildrenArray = Array.isArray(children);

  return (
    <div
      ref={setNodeRef}
      className={`w-full rounded-xl border-2 border-primary-300 shadow-md transition lg:w-80 ${isOver ? "bg-primary-300" : "bg-white"} `}
      style={{
        minHeight: "100%",
        touchAction: "none",
      }}
    >
      <h1 className="relative mb-2 flex items-center justify-center gap-2 rounded-t-xl bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500 p-2 text-center font-bold capitalize text-white shadow-sm">
        {id}
        {id == "todo" ? (
          <MyIcon icon={"ri:todo-line"} className="text-title" />
        ) : id == "inprogress" ? (
          <MyIcon icon={"carbon:in-progress"} className="text-title" />
        ) : (
          <MyIcon
            icon={"ant-design:file-done-outlined"}
            className="text-title"
          />
        )}

        <div className="absolute right-4 text-body text-white">
          {ChildrenArray && children.length > 0 && children.length}
        </div>
      </h1>

      <div className="flex flex-col gap-2 p-2">
        {ChildrenArray && children.length == 0 ? <EmptyColumn /> : children}
      </div>
    </div>
  );
};

export default ColumnComponent;
