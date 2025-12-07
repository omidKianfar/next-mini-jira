"use client";

import { PropsWithChildren } from "react";
import AuthProvider from "./auth/auth-provider";
import NotistackProvider from "../components/atom/error-handler/notistack";
import { Provider } from "react-redux";
import { store } from "../store";

const ProvidersWrapper = ({ children }: PropsWithChildren) => {
  return (
    <NotistackProvider>
      <AuthProvider>
        <Provider store={store}>{children}</Provider>
      </AuthProvider>
    </NotistackProvider>
  );
};

export default ProvidersWrapper;
