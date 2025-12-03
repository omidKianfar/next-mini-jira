"use client";

import { PropsWithChildren } from "react";
import AuthProvider from "./auth/auth-provider";
import NotistackProvider from "../components/atom/error-handler/notistack";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import { store } from "../store";

const FramerMotion = dynamic(() => import("../components/atom/animation"), {
  ssr: false,
});

const ProvidersWrapper = ({ children }: PropsWithChildren) => {
  return (
    <NotistackProvider>
      <AuthProvider>
        <Provider store={store}>
          <FramerMotion>{children}</FramerMotion>
        </Provider>
      </AuthProvider>
    </NotistackProvider>
  );
};

export default ProvidersWrapper;
