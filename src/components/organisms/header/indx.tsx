"use client";

import { usePathname } from "next/navigation";
import { lazy, Suspense, useState } from "react";

// ui
import MyIcon from "@/src/components/atom/icon";
import Logo from "@/src/components/atom/logo";
import DashboardHeader from "./dashboard";
import ModalContainer from "../modal-component";
import PageLoading from "../page-loading";

// type
import { HeaderProps } from "../type";
import AdminDashboardHeader from "./admin-dashboard";
import FilterUsers from "../filters/users";

// lazy
const AddTask = lazy(() => import("../add-task"));
const SearchTasks = lazy(() => import("../serach"));
const FilterTask = lazy(() => import("../filters/tasks"));

const Header = ({ showSidebar, setShowSidebar }: HeaderProps) => {
  // hooks
  const pathname = usePathname();

  // states
  const [open, setOpen] = useState<boolean>(false);
  const [modalcounter, setModalCounter] = useState<number>(0);

  // functions
  const handleOpenModal = (modalNumber: number) => {
    setModalCounter(modalNumber);

    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="sticky top-0 z-50 flex h-[60px] flex-row items-center justify-between border border-white/30 bg-white/20 px-4 shadow-lg backdrop-blur-md lg:h-[80px]">
        <div className="flex w-1/3 items-center justify-start">
          <MyIcon
            icon={"mingcute:menu-fill"}
            className="cursor-pointer text-title text-primary-500 hover:text-primary-700 lg:text-h3"
            onClick={() => setShowSidebar(!showSidebar)}
          />
        </div>

        <div className="flex w-1/3 items-center justify-center">
          <Logo small />
        </div>

        <div className="w-1/3">
          {pathname == "/dashboard" ? (
            <DashboardHeader handleOpenModal={handleOpenModal} />
          ) : pathname == "/admin/dashboard" ? (
            <AdminDashboardHeader handleOpenModal={handleOpenModal} />
          ) : null}
        </div>
      </div>

      <Suspense fallback={<PageLoading />}>
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
          ) : modalcounter == 4 ? (
            <div>
              <SearchTasks handleClose={handleCloseModal} />
            </div>
          ) : modalcounter == 5 ? (
            <div>
              <FilterUsers handleClose={handleCloseModal} />
            </div>
          ) : null}
        </ModalContainer>
      </Suspense>
    </>
  );
};

export default Header;
