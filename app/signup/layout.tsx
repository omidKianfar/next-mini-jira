"use client";

import ProvidersWrapper from "@/src/providers";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full lg:w-screen lg:h-screen  lg:overflow-hidden">
      <ProvidersWrapper>{children}</ProvidersWrapper>
    </div>
  );
};
export default AuthLayout;
