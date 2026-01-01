"use client";

import { usePathname } from "next/navigation";
import { lazy, Suspense, useState } from "react";

// ui
import MyIcon from "@/src/components/atom/icon-components";
import Logo from "@/src/components/atom/logo-component";
import ModalContainer from "../../common/modal-component";
import PageLoading from "../../common/page-loading";
import AdminDashboardHeader from "../../molecule/headers/admin-dashboard";
import DashboardHeader from "../../molecule/headers/dashboard";

// type
import { UserType } from "@/src/types/global";
import { HeaderProps } from "../type";

// firestore
import { useAdminTotalUnreadCount } from "@/src/libs/chat/admin-unread-message-listener";

// hooks
import { useAuth } from "@/src/hooks/auth/use-auth";
import { useUnreadCount } from "@/src/hooks/chat/use-unread-count";

// lazy
const AddTask = lazy(() => import("../modals/add-task-modal"));
const SearchTasks = lazy(() => import("../modals/serach-modals/search-tasks"));
const FilterTask = lazy(() => import("../modals/filter-modals/tasks"));
const SearchUsers = lazy(() => import("../modals/serach-modals/serach-users"));
const FilterUsers = lazy(() => import("../modals/filter-modals/users"));

const Header = ({ showSidebar, setShowSidebar }: HeaderProps) => {
  // hooks
  const pathname = usePathname();
  const { user } = useAuth();

  // states
  const [open, setOpen] = useState<boolean>(false);
  const [modalcounter, setModalCounter] = useState<number>(0);

  // functions
  // user unread message
  const UserUnreadCount = useUnreadCount({
    chatId: user?.userId as string,
    senderType: UserType.Admin,
  });

  // admin unread count
  const AdminUnraedCount = useAdminTotalUnreadCount();

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
        <div className="relative flex w-1/3 items-center justify-start">
          <MyIcon
            icon={"mingcute:menu-fill"}
            className="cursor-pointer text-title text-primary-500 hover:text-primary-700 lg:text-h3"
            onClick={() => setShowSidebar(!showSidebar)}
          />

          {user?.userType === UserType.Client && UserUnreadCount > 0 && (
            <div className="absolute left-0 top-0 h-[10px] w-[10px] rounded-full bg-warning-500"></div>
          )}

          {user?.userType === UserType.Admin && AdminUnraedCount > 0 && (
            <div className="absolute left-0 top-0 h-[10px] w-[10px] rounded-full bg-warning-500"></div>
          )}
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
              <SearchUsers handleClose={handleCloseModal} />
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
