"use client";

import { usePathname } from "next/navigation";
import { useAuth, useEffect, useNavigation } from "../imports";

export const useRequireActiveStatus = () => {
  const pathname = usePathname();
  const navigation = useNavigation();
  const auth = useAuth();

  const user = auth?.user;
  const isLoading = auth?.isLoading;

  useEffect(() => {
    if (isLoading) return;
    if (!user) return;
    if (pathname.includes("/signup")) return;

    if (!user?.isActive) {
      navigation.activePage();
      return;
    }
  }, [isLoading, user, navigation]);
};
