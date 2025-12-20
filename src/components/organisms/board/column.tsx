"use client";

import { useState, useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";

// ui
import MyIcon from "@/src/components/atom/icon";
import EmptyColumn from "./empty-column";

// type
import { ColumnProps } from "@/src/components/pages/type";

const ColumnComponent = ({ id, children }: ColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  // initialize
  const ChildrenArray = Array.isArray(children);

  const storageKey = `column-collapse-${id}`;

  // functions
  const [show, setShow] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(storageKey);
      return saved === null ? true : saved === "true";
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, String(show));
  }, [show, storageKey]);

  const toggleCollapse = () => {
    setShow((prev) => !prev);
  };

  return (
    <div
      ref={setNodeRef}
      className={`h-auto w-full rounded-xl border-2 border-primary-300 shadow-md transition lg:w-80 ${
        isOver ? "bg-primary-200" : "bg-white"
      }`}
      style={{
        touchAction: "none",
      }}
    >
      <div
        className={`relative flex items-center justify-center gap-2 ${!show ? "rounded-lg" : "rounded-t-xl"} bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500 p-2 text-center font-bold capitalize text-white shadow-sm`}
      >
        <h1>{id}</h1>

        {id === "todo" ? (
          <MyIcon icon="ri:todo-line" className="text-title" />
        ) : id === "inprogress" ? (
          <MyIcon icon="carbon:in-progress" className="text-title" />
        ) : (
          <MyIcon icon="ant-design:file-done-outlined" className="text-title" />
        )}

        <div className="absolute left-4 text-body text-white">
          {ChildrenArray && children.length > 0 && children.length}
        </div>

        <button
          className="absolute right-2 text-xl text-white"
          onClick={toggleCollapse}
        >
          <MyIcon
            icon={show ? "mdi:chevron-down" : "mdi:chevron-up"}
            className="text-h4 hover:text-warning-500"
          />
        </button>
      </div>

      {show && (
        <div className="flex flex-col gap-2 p-2">
          {ChildrenArray && children.length === 0 ? <EmptyColumn /> : children}
        </div>
      )}
    </div>
  );
};

export default ColumnComponent;
