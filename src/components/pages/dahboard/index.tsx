"use client";

import {
  BoardComponent,
  useAuth,
  useRequireActiveStatus,
  useRequirePaymentStatus,
  useTaskListener,
} from "../imports";
import DashboardHeader from "../../molecule/headers/dashboard-header";

const DashboardComponent = () => {
  const { user } = useAuth();

  useRequireActiveStatus();
  useRequirePaymentStatus();

  useTaskListener({ user });

  return (
    <div className="w-screen min-h-screen overflow-y-auto scrollbar-hide">
      <DashboardHeader />

      <BoardComponent />
    </div>
  );
};

export default DashboardComponent;
