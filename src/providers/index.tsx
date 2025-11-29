"use client";

import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import AuthProvider from "./auth-provider";
import NotistackProvider from "../components/atom/error-handler/notistack";

const ProvidersWrapper = ({ children }: PropsWithChildren) => {
  return (
    <NotistackProvider>
      <Provider store={store}>
        <AuthProvider>{children}</AuthProvider>
      </Provider>
    </NotistackProvider>
  );
};

export default ProvidersWrapper;
