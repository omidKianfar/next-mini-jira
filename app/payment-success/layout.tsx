"use client";

import { PropsWithChildren } from "react";
import ProvidersWrapper from "@/src/providers";

const ProviderLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-100">
      <ProvidersWrapper>{children}</ProvidersWrapper>
    </div>
  );
};

export default ProviderLayout;
