"use client";

import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

const AuthGuard = ({ children }:PropsWithChildren) => {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/auth/signin");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  return children;
};

export default AuthGuard;
