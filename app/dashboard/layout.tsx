"use client";

import { PropsWithChildren, useState } from "react";

// guard
import AuthGuard from "@/src/guards/auth-guard";
import RoleGuard from "@/src/guards/role-guard";

// ui
import Header from "@/src/components/organisms/header/indx";
import SideBar from "@/src/components/organisms/sidebar/user-sidebar/index";

// type
import { UserType } from "@/src/types/global";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  // states
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <AuthGuard>
      <RoleGuard accessTypes={[UserType.Client]}>
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        <div className="p-4" onClick={() => setShowSidebar(false)}>
          {children}
        </div>
      </RoleGuard>
    </AuthGuard>
  );
};

export default DashboardLayout;
