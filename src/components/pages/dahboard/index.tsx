"use client";

import {
  BoardComponent,
  useAuth,
  useRequireUserStatus,
  useTaskListener,
} from "../imports";

const DashboardComponent = () => {
  const { user } = useAuth();

  useRequireUserStatus();

  useTaskListener({ user });

  return (
    <div className="w-full h-full min-h-screen overflow-y-auto p-2">
      <BoardComponent />
    </div>
  );
};

export default DashboardComponent;
