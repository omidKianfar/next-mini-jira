import { usePathname } from 'next/navigation';
import LandingDashboard from './headers/landing-dashboard';
import DashboardHeader from './headers/user-dashboard';
import AdminDashboardHeader from './headers/admin-dashboard';
import AdminSupportHeader from './headers/admin-support';
import { ModalProps } from '@/src/types/global';

const RightSideHeaders = ({
  handleOpenModal,
}: Pick<ModalProps, 'handleOpenModal'>) => {
  const pathname = usePathname();

  return (
    <div className="w-1/3">
      {pathname == '/' ? (
        <LandingDashboard />
      ) : pathname == '/dashboard' ? (
        <DashboardHeader handleOpenModal={handleOpenModal} />
      ) : pathname == '/admin/dashboard' ? (
        <AdminDashboardHeader handleOpenModal={handleOpenModal} />
      ) : pathname.includes('/admin/support') ? (
        <AdminSupportHeader handleOpenModal={handleOpenModal} />
      ) : null}
    </div>
  );
};

export default RightSideHeaders;
