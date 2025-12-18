"use client";

import { useAuth } from "@/src/hooks/auth/use-auth";
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
    <div className="min-h-screen w-full px-2 py-4">
      <BoardComponent />
    </div>
  );
};

export default DashboardComponent;
