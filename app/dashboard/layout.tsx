"use client";

import { PropsWithChildren } from "react";
import AuthGuard from "@/src/guards/auth-guard";
import ProvidersWrapper from "@/src/providers";

const AuthProtectedLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-100">
      <ProvidersWrapper>
        <AuthGuard>{children}</AuthGuard>
      </ProvidersWrapper>
    </div>
  );
};

export default AuthProtectedLayout;
