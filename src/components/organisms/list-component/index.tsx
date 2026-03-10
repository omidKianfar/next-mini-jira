'use client';

import { ListComponentProps } from '../type';

const ListComponent = ({ children }: ListComponentProps) => {
  return (
    <div className="my-3 h-full w-full rounded-lg bg-white p-2 shadow">
      <div className="scrollbar-hide flex max-h-[calc(100vh-180px)] flex-col gap-3 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default ListComponent;
