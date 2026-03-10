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
