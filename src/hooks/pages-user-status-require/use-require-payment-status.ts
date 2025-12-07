"use client";

import { usePathname } from "next/navigation";
import { dayjs, useAuth, useEffect, useRouter } from "../imports";

export const useRequirePaymentStatus = () => {
  const router = useRouter();
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
