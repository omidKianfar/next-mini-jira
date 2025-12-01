"use client";

import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

const AuthGuard = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { isInitialized, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.replace("/signin");
    }
  }, [isInitialized, isAuthenticated, router]);

  if (!isInitialized) return null;

  if (!isAuthenticated) return null;

  return children;
};

export default AuthGuard;
