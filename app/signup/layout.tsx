"use client";

import ProvidersWrapper from "@/src/providers";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-100">
      <ProvidersWrapper>{children}</ProvidersWrapper>
    </div>
  );
};
export default AuthLayout;
