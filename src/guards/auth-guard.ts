"use client";

import { PropsWithChildren, useEffect } from "react";

// hooks
import { useAuth } from "../hooks/auth/use-auth";
import { useNavigation } from "../hooks/navigation/use-navigation";

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
