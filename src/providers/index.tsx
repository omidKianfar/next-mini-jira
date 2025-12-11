"use client";

import { PropsWithChildren } from "react";
import AuthProvider from "./auth/auth-provider";
import { Provider } from "react-redux";
import { store } from "../store";
import NotistackProvider from "./notistack/notistack";

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
