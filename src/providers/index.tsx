"use client";

import { PropsWithChildren } from "react";
import AuthProvider from "./auth/auth-provider";
import NotistackProvider from "../components/atom/error-handler/notistack";
import FramerMotion from "../components/atom/animation";

const ProvidersWrapper = ({ children }: PropsWithChildren) => {
  return (
    <NotistackProvider>
      <AuthProvider>
        <FramerMotion>{children}</FramerMotion>
      </AuthProvider>
    </NotistackProvider>
  );
};

export default ProvidersWrapper;
