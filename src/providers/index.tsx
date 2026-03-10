'use client';

import {
  ErrorBoundary,
  ErrorFallback,
  NotistackProvider,
  PropsWithChildren,
  Provider,
  store,
} from './imports';
import AuthProvider from './auth-provider';
import { ChatProvider } from './chat.provider';

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
