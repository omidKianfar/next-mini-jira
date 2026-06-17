'use client';

import { PropsWithChildren, useRef, useState } from 'react';
import AuthGuard from '@/src/guards/auth-guard';
import RoleGuard from '@/src/guards/role-guard';
import Header from '@/src/components/organisms/header-component';
import SideBar from '@/src/components/organisms/sidebar-component/user-sidebar';
import { UserType } from '@/src/types/global';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <AuthGuard>
      <RoleGuard accessTypes={[UserType.Admin]}>
        <Header
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          menuRef={menuRef as React.RefObject<HTMLDivElement>}
        />

        <SideBar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          menuRef={menuRef as React.RefObject<HTMLDivElement>}
        />

        <div onClick={() => setShowSidebar(false)}>{children}</div>
      </RoleGuard>
    </AuthGuard>
  );
};

export default DashboardLayout;
