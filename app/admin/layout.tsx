'use client';

import { PropsWithChildren, useState } from 'react';
import AuthGuard from '@/src/guards/auth-guard';
import RoleGuard from '@/src/guards/role-guard';
import Header from '@/src/components/organisms/header-component/indx';
import SideBar from '@/src/components/organisms/sidebar-component/user-sidebar';
import { UserType } from '@/src/types/global';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

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
