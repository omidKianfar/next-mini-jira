"use client";

import { PropsWithChildren } from "react";
import AuthGuard from "@/src/guards/auth-guard";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default DashboardLayout;
