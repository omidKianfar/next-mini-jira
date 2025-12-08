"use client";

import { PropsWithChildren } from "react";
import ProvidersWrapper from "@/src/providers";
import AuthGuard from "@/src/guards/auth-guard";

const ProviderLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-screen h-screen overflow-hidden ">
      <ProvidersWrapper>
        <AuthGuard>{children}</AuthGuard>
      </ProvidersWrapper>
    </div>
  );
};

export default ProviderLayout;
