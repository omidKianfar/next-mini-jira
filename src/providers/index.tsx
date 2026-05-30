'use client';

import { Provider } from 'react-redux';
import AuthProvider from './auth-provider';
import { ChatProvider } from './chat.provider';
import ErrorFallback from '../components/common/error-boundray/error-fallback';
import NotistackProvider from './notistack';
import { store } from '../store';
import ErrorBoundary from '../components/common/error-boundray/error-boundary';

const ProvidersWrapper = ({ children }: React.PropsWithChildren) => {
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
