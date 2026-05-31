'use client';

import { useState } from 'react';
import Header from '@/src/components/organisms/header-component/indx';
import SideBar from '@/src/components/organisms/sidebar-component/user-sidebar';
import HomeComponent from '@/src/components/pages/landing';

const HomePage = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <div>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <HomeComponent />
    </div>
  );
};

export default HomePage;
