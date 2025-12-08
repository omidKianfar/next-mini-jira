"use client";

import { PropsWithChildren } from "react";
import AuthGuard from "@/src/guards/auth-guard";
import ProvidersWrapper from "@/src/providers";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-screen h-screen overflow-y-auto scrollbar-hide">
      <ProvidersWrapper>
        <AuthGuard>
          {children}
        </AuthGuard>
      </ProvidersWrapper>
    </div>
  );
};

export default DashboardLayout;
