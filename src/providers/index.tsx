"use client";

import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "../store";
import AuthProvider from "./auth-provider";

const ProvidersWrapper = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthProvider>{children}</AuthProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default ProvidersWrapper;
