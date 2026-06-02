'use client';

import { lazy } from 'react';
import { usePathname } from 'next/navigation';
import { ModalProps } from '@/src/types/global';

const LandingDashboard = lazy(() => import('./headers/landing-dashboard'));
const DashboardHeader = lazy(() => import('./headers/user-dashboard'));
const AdminDashboardHeader = lazy(() => import('./headers/admin-dashboard'));
const AdminSupportHeader = lazy(() => import('./headers/admin-support'));

const RightSideHeaders = ({
  handleOpenModal,
}: Pick<ModalProps, 'handleOpenModal'>) => {
  const pathname = usePathname();

  const renderHeader = () => {
    if (['/', '/about', '/contact'].includes(pathname)) {
      return <LandingDashboard />;
    }

    switch (pathname) {
      case '/dashboard':
        return <DashboardHeader handleOpenModal={handleOpenModal} />;
      case '/admin/dashboard':
        return <AdminDashboardHeader handleOpenModal={handleOpenModal} />;
      default:
        if (pathname.includes('/admin/support')) {
          return <AdminSupportHeader handleOpenModal={handleOpenModal} />;
        }
        return null;
    }
  };

  return <div className="flex w-1/3 justify-end">{renderHeader()}</div>;
};

export default RightSideHeaders;
