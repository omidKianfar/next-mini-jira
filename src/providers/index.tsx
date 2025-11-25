"use client";

import { PropsWithChildren } from "react";
import AuthProvider from "./auth/auth-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ProvidersWrapper = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export default ProvidersWrapper;
