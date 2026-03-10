'use client';

import {
  AuthGuard,
  Header,
  PropsWithChildren,
  RoleGuard,
  SideBar,
  UserType,
  useState,
} from '../imports';

const DashboardLayout = ({ children }: PropsWithChildren) => {
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
