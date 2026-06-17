'use client';

import { PropsWithChildren, useRef, useState } from 'react';
import Header from '@/src/components/organisms/header-component';
import SideBar from '@/src/components/organisms/sidebar-component/user-sidebar';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <>
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
    </>
  );
};

export default DashboardLayout;
