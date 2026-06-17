'use client';

import { useRef, useState } from 'react';
import Header from '@/src/components/organisms/header-component';
import SideBar from '@/src/components/organisms/sidebar-component/user-sidebar';
import HomeComponent from '@/src/components/pages/landing';

const HomePage = () => {
  const menuRef = useRef<HTMLDivElement | null>(null!);

  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <div>
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

      <HomeComponent />
    </div>
  );
};

export default HomePage;
