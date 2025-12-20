"use client";

import { lazy, Suspense, useState } from "react";
import { usePathname } from "next/navigation";
import dayjs from "dayjs";

// hooks
import { useAuth } from "@/src/hooks/auth/use-auth";
import { useRequireActiveStatus } from "@/src/hooks/pages-user-status-require/use-require-active-status";
import { usePlanAction } from "@/src/hooks/payment/usePlanAction";
import { useNavigation } from "@/src/hooks/navigation";

// type
import { PlanType } from "@/src/types/global";

// ui
import PageLoading from "../../organisms/page-loading";
import FramerMotion from "../../atom/animation";

// lazy
const ActivePaymentComponent = lazy(
  () => import("./payment-page/ActivePayment"),
);
const ChoosePlanComponent = lazy(() => import("./payment-page/ChoosePlan"));

const PlanComponent = () => {
  // hooks
  const pathName = usePathname();
  const navigation = useNavigation();

  const { changeStep, user } = useAuth();
  const { choosePlan } = usePlanAction();

  useRequireActiveStatus();

  // states
  const [loading, setLoading] = useState(false);

  // date
  const now = dayjs();

  // pathnames
  const isSignupPage = pathName.includes("/signup");
  const isDashboard = pathName.includes("/dashboard");

  // payments
  const payment = user?.payment;

  const hasActivePayment = Boolean(
    payment?.endAt && now.isBefore(payment.endAt),
  );

  // functions
  const BackToPlan = () => {
    if (isSignupPage) {
      changeStep("2");
    } else {
      navigation.dashboard();
    }
  };

  const BackDashboard = () => navigation.dashboard();

  const choosePlanHandler = async (selectedPlan: PlanType) => {
    setLoading(true);
    await choosePlan({ selectedPlan, setLoading });
  };

  // ui
  if (loading) return <PageLoading />;

  return (
    <Suspense fallback={<PageLoading />}>
      <FramerMotion>
        <div
          className={`flex w-full flex-col items-center justify-center p-4 ${
            isSignupPage ? "min-h-screen" : ""
          }`}
        >
          {isDashboard && hasActivePayment ? (
            <ActivePaymentComponent
              payment={payment}
              onBack={BackDashboard}
              now={now}
            />
          ) : (
            <ChoosePlanComponent
              onBack={BackToPlan}
              onChoosePlan={choosePlanHandler}
            />
          )}
        </div>
      </FramerMotion>
    </Suspense>
  );
};

export default PlanComponent;
