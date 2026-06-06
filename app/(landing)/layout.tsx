'use client';

import { PropsWithChildren, useState } from 'react';
import Header from '@/src/components/organisms/header-component';
import SideBar from '@/src/components/organisms/sidebar-component/user-sidebar';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <div onClick={() => setShowSidebar(false)}>{children}</div>
    </>
  );
};

export default DashboardLayout;
