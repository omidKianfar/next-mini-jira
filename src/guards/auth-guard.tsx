"use client";

import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "../hooks/auth/use-auth";
import { useNavigation } from "../hooks/navigation";

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
