"use client";

import { lazy, Suspense } from "react";

// hooks
import { useAuth } from "@/src/hooks/auth/use-auth";
import { useRequireActiveStatus } from "@/src/hooks/pages-user-status-require/use-require-active-status";
import { useRequirePaymentStatus } from "@/src/hooks/pages-user-status-require/use-require-payment-status";
import { useTaskListener } from "@/src/hooks/tasks/use-task-listener";

// ui
import PageLoading from "../../common/page-loading";

// lazy
const BoardComponent = lazy(() => import("../../organisms/tasks-boards"));

const DashboardComponent = () => {
  // hooks
  const { user } = useAuth();

  useRequireActiveStatus();
  useRequirePaymentStatus();

  // task listener
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
