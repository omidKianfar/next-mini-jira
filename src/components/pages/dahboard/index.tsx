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
    <div className="w-full h-full min-h-screen overflow-y-auto">
      <DashboardHeader />
      <BoardComponent />
    </div>
  );
};

export default DashboardComponent;
