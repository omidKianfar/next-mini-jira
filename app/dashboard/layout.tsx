"use client";

import { PropsWithChildren } from "react";
import AuthGuard from "@/src/guards/auth-guard";
import ProvidersWrapper from "@/src/providers";
import DashboardHeader from "@/src/components/pages/dahboard/header";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-screen h-screen  bg-gray-100 overflow-y-auto scrollbar-hide">
      <ProvidersWrapper>
        <AuthGuard>
          <DashboardHeader />
          {children}
        </AuthGuard>
      </ProvidersWrapper>
    </div>
  );
};

export default DashboardLayout;
