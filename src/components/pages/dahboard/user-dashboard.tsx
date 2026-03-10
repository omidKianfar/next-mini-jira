'use client';

import {
  BoardComponent,
  PageLoading,
  Suspense,
  useAuth,
  useRequireActiveStatus,
  useRequirePaymentStatus,
  useTaskListener,
} from '../imports';

const DashboardComponent = () => {
  const { user } = useAuth();

  useRequireActiveStatus();
  useRequirePaymentStatus();

  useTaskListener({ user });

  return (
    <div className="min-h-screen w-full">
      <Suspense fallback={<PageLoading />}>
        <BoardComponent />
      </Suspense>
    </div>
  );
};

export default DashboardComponent;
