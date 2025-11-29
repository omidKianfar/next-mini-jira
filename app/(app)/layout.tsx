"use client";

import { PropsWithChildren } from "react";
import ProvidersWrapper from "@/src/providers";

const ProviderLayout = ({ children }: PropsWithChildren) => {
  return <ProvidersWrapper>{children}</ProvidersWrapper>;
};

export default ProviderLayout;
