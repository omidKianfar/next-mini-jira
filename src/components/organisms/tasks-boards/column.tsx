'use client';

import { useState, useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import MyIcon from '@/src/components/atom/icon-components';
import EmptyColumn from '../../atom/empty-components/empty-column';
import { ColumnProps } from '@/src/types/global';

const ColumnComponent = ({ id, children }: ColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  const ChildrenArray = Array.isArray(children);

  const storageKey = `column-collapse-${id}`;

  const [show, setShow] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      return saved === null ? true : saved === 'true';
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
      className={`h-auto w-full rounded-xl border-2 border-primary-300 shadow-md transition lg:h-full lg:w-80 ${
        isOver ? 'bg-primary-200' : 'bg-white'
      }`}
      style={{
        touchAction: 'none',
      }}
    >
      <div
        className={`relative flex items-center justify-center gap-2 ${!show ? 'rounded-lg' : 'rounded-t-xl'} bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500 p-2 text-center font-bold capitalize text-white shadow-sm`}
      >
        <h1>{id}</h1>

        {id === 'todo' ? (
          <MyIcon icon="todo" className="text-title" />
        ) : id === 'inprogress' ? (
          <MyIcon icon="progress" className="text-title" />
        ) : (
          <MyIcon icon="done" className="text-title" />
        )}

        <div className="absolute left-4 text-body text-white">
          {ChildrenArray && children.length > 0 && children.length}
        </div>

        <button
          className="absolute right-2 text-xl text-white"
          onClick={toggleCollapse}
        >
          <MyIcon
            icon={show ? 'arrow-open' : 'arrow-close'}
            className="text-h4 hover:text-warning-500"
          />
        </button>
      </div>

      {show && (
        <div className="scrollbar-hide flex flex-col gap-2 p-2 lg:max-h-[calc(100vh-150px)] lg:min-h-[calc(100vh-150px)] lg:overflow-y-auto">
          {ChildrenArray && children.length === 0 ? <EmptyColumn /> : children}
        </div>
      )}
    </div>
  );
};

export default ColumnComponent;
