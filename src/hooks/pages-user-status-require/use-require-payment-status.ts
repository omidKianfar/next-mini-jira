"use client";

import { usePathname } from "next/navigation";
import { dayjs, useAuth, useEffect, useNavigation } from "../imports";

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
