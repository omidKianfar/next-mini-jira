"use client";

import {
  BoardComponent,
  useAuth,
  useRequireActiveStatus,
  useRequirePaymentStatus,
  useTaskListener,
} from "../imports";

const DashboardComponent = () => {
  const { user } = useAuth();

  useRequireActiveStatus();
  useRequirePaymentStatus();

  useTaskListener({ user });

  return (
    <div className="w-full h-full min-h-screen overflow-y-auto p-2">
      <BoardComponent />
    </div>
  );
};

export default DashboardComponent;
