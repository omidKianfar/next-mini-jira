"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// hooks
import { useAuth } from "../auth/use-auth";
import { useNavigation } from "../navigation";
import { UserType } from "@/src/types/global";

export const useRequireActiveStatus = () => {
  const pathname = usePathname();
  const navigation = useNavigation();
  const auth = useAuth();

  const user = auth?.user;
  const isLoading = auth?.isLoading;

  useEffect(() => {
    if (user?.userType == UserType?.Admin) return;

    if (isLoading) return;
    if (!user) return;
    if (pathname.includes("/signup")) return;

    if (!user?.isActive) {
      navigation.activePage();
      return;
    }
  }, [isLoading, user, navigation]);
};
