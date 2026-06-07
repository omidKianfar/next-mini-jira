import { Suspense } from 'react';
import FramerMotion from '@/src/components/atom/animation-component';
import PageLoading from '@/src/components/common/page-loading';
import AdminUserDetailComponent from '@/src/components/pages/admin/dashboard/user-detail';

const AdminUserDetailPage = () => {
  return (
    <FramerMotion>
      <Suspense fallback={<PageLoading />}>
        <AdminUserDetailComponent />
      </Suspense>
    </FramerMotion>
  );
};

export default AdminUserDetailPage;
