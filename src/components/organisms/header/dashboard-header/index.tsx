"use client";

import MyIcon from "@/src/components/atom/icon";
import { ModalProps } from "@/src/components/molecule/type";

const DashboardHeader = ({
  handleOpenModal,
}: Pick<ModalProps, "handleOpenModal">) => {
  return (
    <div className="flex items-center justify-end">
      <MyIcon
        icon={"line-md:filter-twotone"}
        className="mr-2 cursor-pointer text-title text-primary-500 hover:text-primary-700 lg:mr-3 lg:text-h3"
        onClick={() => handleOpenModal?.(3)}
      />

      <MyIcon
        icon={"line-md:search-twotone"}
        className="mr-2 cursor-pointer text-title text-primary-500 hover:text-primary-700 lg:mr-4 lg:text-h3"
        onClick={() => handleOpenModal?.(2)}
      />

      <MyIcon
        icon={"hugeicons:task-add-01"}
        className="cursor-pointer text-title text-primary-500 hover:text-primary-700 lg:text-h3"
        onClick={() => handleOpenModal?.(1)}
      />
    </div>
  );
};

export default DashboardHeader;
