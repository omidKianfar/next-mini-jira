"use client";

import MyIcon from "@/src/components/atom/icon";

import Logo from "@/src/components/atom/logo";
import { usePathname } from "next/navigation";
import DashboardHeader from "./dashboard-header";
import ModalContainer from "../../molecule/modal-component";
import AddTask from "../add-task";
import SearchTasks from "../../molecule/serach";
import FilterTask from "../../molecule/filters";
import { useState } from "react";

const Header = () => {
  const pathname = usePathname();

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
      <div className="sticky top-0 z-50  flex h-[60px] flex-row items-center justify-between border border-white/30 bg-white/20 px-4 shadow-lg backdrop-blur-lg lg:h-[80px]">
        <div className="flex w-1/3 items-center justify-start">
          <MyIcon
            icon={"mingcute:menu-fill"}
            className="cursor-pointer text-title text-primary-500 hover:text-primary-700 lg:text-h3"
          />
        </div>

        <div className="flex w-1/3 items-center justify-center">
          <Logo small />
        </div>

        <div className="w-1/3">
          {pathname == "/dashboard" ? (
            <DashboardHeader handleOpenModal={handleOpenModal} />
          ) : null}
        </div>
      </div>

      <ModalContainer open={open} handleClose={handleCloseModal}>
        {modalcounter == 1 ? (
          <AddTask handleClose={handleCloseModal} />
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

export default Header;
