"use client";

import { useEffect } from "react";
import dayjs from "dayjs";
import { usePathname } from "next/navigation";

// hooks
import { useNavigation } from "../navigation/use-navigation";
import { useAuth } from "../auth/use-auth";

// types
import { UserType } from "@/src/types/global";

export const useRequirePaymentStatus = () => {
  // hooks
  const navigation = useNavigation();
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  // functions
  useEffect(() => {
    if (user?.userType == UserType?.Admin) return;

    if (isLoading || !user) return;

    if (pathname.includes("/signup")) return;

    const now = dayjs();
    const payment = user.payment;

    if (payment?.freeTrialEnabled) {
      if (payment.trialEnd && now.isAfter(payment.trialEnd)) {
        navigation.payment();
        return;
      }
      return;
    }

    if (payment?.endAt) {
      if (now.isAfter(payment.endAt)) {
        navigation.payment();
        return;
      }
      return;
    }

    if (!payment?.isPaid && !payment?.freeTrialEnabled) {
      navigation.payment();
      return;
    }
  }, [isLoading, user, pathname, navigation]);
};
