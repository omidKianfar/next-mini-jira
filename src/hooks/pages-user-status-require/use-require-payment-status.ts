"use client";

import { usePathname } from "next/navigation";
import { useNavigation } from "../navigation";
import { useAuth } from "../auth/use-auth";
import { useEffect } from "react";
import dayjs from "dayjs";

export const useRequirePaymentStatus = () => {
  const navigation = useNavigation();
  const auth = useAuth();
  const pathname = usePathname();

  const user = auth?.user;
  const isLoading = auth?.isLoading;

  useEffect(() => {
    if (isLoading) return;
    if (!user) return;
    if (pathname.includes("/signup")) return;

    const now = dayjs();

    const payment = user?.payment;

    if (payment?.freeTrialEnabled) {
      if (now.isAfter(payment.trialEnd)) {
        navigation.payment();
        return;
      }
    }

    if (payment?.isPaid) {
      if (now.isAfter(payment.endAt)) {
        navigation.payment();
        return;
      }
    }
  }, [isLoading, user, navigation]);
};
