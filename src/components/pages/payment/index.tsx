"use client";

import { useAuth } from "@/src/hooks/auth/use-auth";
import { useRequireActiveStatus } from "@/src/hooks/pages-user-status-require/use-require-active-status";
import { usePlanAction } from "@/src/hooks/payment";
import { PlanType } from "@/src/types/global";
import { useNavigation } from "@/src/hooks/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";
import dayjs from "dayjs";
import FramerMotion from "../../atom/animation";
import PageLoading from "../../organisms/page-loading";
import ActivePaymentComponent from "./payment-page/ActivePayment";
import ChoosePlanComponent from "./payment-page/ChoosePlan";

const PlanComponent = () => {
  const pathName = usePathname();
  const navigation = useNavigation();

  const { changeStep, user } = useAuth();
  const { choosePlan } = usePlanAction();

  useRequireActiveStatus();

  const [loading, setLoading] = useState(false);

  const now = dayjs();

  const isSignupPage = pathName.includes("/signup");
  const isDashboard = pathName.includes("/dashboard");

  const payment = user?.payment;

  const hasActivePayment = Boolean(
    payment?.endAt && now.isBefore(payment.endAt),
  );

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

  if (loading) return <PageLoading />;

  return (
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
  );
};

export default PlanComponent;
