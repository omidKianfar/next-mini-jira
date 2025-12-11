"use client";

import { useAuth } from "@/src/hooks/auth/use-auth";
import DashboardHeader from "../../organisms/headers/dashboard-header";
import { useRequireActiveStatus } from "@/src/hooks/pages-user-status-require/use-require-active-status";
import { useRequirePaymentStatus } from "@/src/hooks/pages-user-status-require/use-require-payment-status";
import { useTaskListener } from "@/src/hooks/tasks/use-task-listener";
import BoardComponent from "../../organisms/board";

const DashboardComponent = () => {
  const { user } = useAuth();

  useRequireActiveStatus();
  useRequirePaymentStatus();

  useTaskListener({ user });

  return (
    <div className="min-h-screen w-full pb-2">
      <DashboardHeader />

      <BoardComponent />
    </div>
  );
};

export default DashboardComponent;
