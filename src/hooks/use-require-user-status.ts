"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useAuth } from "./useAuth";

export const useRequireUserStatus = () => {
  const router = useRouter();
  const auth = useAuth();

  const user = auth?.user;
  const isLoading = auth?.isLoading;

  useEffect(() => {
    if (isLoading) return;
    if (!user) return;

    const now = dayjs();

    const payment = user?.payment;

    if (!user?.isActive) {
      router.push("/active-page");
      return;
    }

    if (payment?.freeTrialEnabled) {
      if (now.isAfter(payment.trialEnd)) {
        router.push("/payment");
        return;
      }
    }

    if (payment?.isPaid) {
      if (now.isAfter(payment.endAt)) {
        router.push("/payment");
        return;
      }
    }
  }, [isLoading, user, router]);
};
