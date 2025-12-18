"use client";

import { PropsWithChildren } from "react";
import AuthGuard from "@/src/guards/auth-guard";
import Header from "@/src/components/organisms/headers/indx";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <AuthGuard>
      <Header />

      {children}
    </AuthGuard>
  );
};

export default DashboardLayout;
