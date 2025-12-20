"use client";

import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import NotistackProvider from "./notistack";

// provider
import AuthProvider from "./auth-provider";

// redux
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
