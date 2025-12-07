"use client";

import {  useAuth, useEffect, useRouter } from "../imports";

export const useRequireActiveStatus = () => {
  const router = useRouter();
  const auth = useAuth();

  const user = auth?.user;
  const isLoading = auth?.isLoading;

  useEffect(() => {
    if (isLoading) return;
    if (!user) return;

    if (!user?.isActive) {
      router.push("/active-page");
      return;
    }
  }, [isLoading, user, router]);
};
