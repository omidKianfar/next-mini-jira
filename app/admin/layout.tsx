"use client";

import { PropsWithChildren, useState } from "react";

// guard
import AuthGuard from "@/src/guards/auth-guard";
import RoleGuard from "@/src/guards/role-guard";

// ui
import SideBar from "@/src/components/organisms/sidebar-component/user-sidebar/index";
import Header from "@/src/components/organisms/header-component/indx";

// type
import { UserType } from "@/src/types/global";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  // states
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <AuthGuard>
      <RoleGuard accessTypes={[UserType.Admin]}>
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        <div onClick={() => setShowSidebar(false)}>{children}</div>
      </RoleGuard>
    </AuthGuard>
  );
};

export default DashboardLayout;
