"use client";

import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import NotistackProvider from "./notistack";

// provider
import AuthProvider from "./auth-provider";
import { ChatProvider } from "./chat.provider";

// redux
import { store } from "../store";

// common
import ErrorBoundary from "../components/common/error-boundray/error-boundary";
import ErrorFallback from "../components/common/error-boundray/error-fallback";

const ProvidersWrapper = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <NotistackProvider>
        <AuthProvider>
          <Provider store={store}>
            <ChatProvider>{children}</ChatProvider>
          </Provider>
        </AuthProvider>
      </NotistackProvider>
    </ErrorBoundary>
  );
};

export default ProvidersWrapper;
