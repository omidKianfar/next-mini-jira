'use client';

import {
  PropsWithChildren,
  useAuth,
  useEffect,
  useNavigation,
} from './imports';

const AuthGuard = ({ children }: PropsWithChildren) => {
  const navigation = useNavigation();
  const { isInitialized, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      navigation.signin();
    }
  }, [isInitialized, isAuthenticated, navigation]);

  if (!isInitialized) return null;
  if (!isAuthenticated) return null;

  return children;
};

export default AuthGuard;
