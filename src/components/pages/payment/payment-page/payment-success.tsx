"use client";

import { useState } from "react";
import { useAuth } from "@/src/hooks/auth/use-auth";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { updateFirestoreUser } from "@/src/lib/auth/update-user";
import { useSetSubscriptionId } from "@/src/hooks/auth/use-payment-success";
import { useNavigation } from "@/src/hooks/navigation";
import PageLoading from "@/src/components/organisms/page-loading";
import MyIcon from "@/src/components/atom/icon";
import ButtonNext from "@/src/components/atom/button/button-next";

const PaymentSuccessComponent = () => {
  const params = useSearchParams();

  const navigation = useNavigation();
  const { user, changeStep } = useAuth();

  const planType = params.get("planType");
  const sessionId = params.get("session_id");

  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const now = dayjs().format("YYYY-MM-DD");
  const oneMonth = dayjs().add(1, "month").format("YYYY-MM-DD");
  const oneYear = dayjs().add(1, "year").format("YYYY-MM-DD");

  useSetSubscriptionId({ sessionId, setLoading, setSubscriptionId });

  const finishHandler = async () => {
    if (!user?.userId) {
      console.log("User not found");
      return;
    }

    if (!planType || !subscriptionId) {
      console.log("Missing planType or subscriptionId");
      return;
    }

    const data = {
      payment: {
        freeTrialEnabled: false,
        trialEnd: now,
        isPaid: true,
        planType: planType,
        subscriptionId: subscriptionId,
        createdAt: now,
        endAt: planType === "monthly" ? oneMonth : oneYear,
      },
    };

    await updateFirestoreUser(user.userId, data);

    changeStep("0");

    navigation.dashboard();
  };

  if (loading) return <PageLoading />;

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="h-screen w-screen rounded-xl border-warning-300 bg-white p-6 shadow-sm lg:h-[500px] lg:w-[600px] lg:border-2">
        <MyIcon
          icon={"streamline-freehand:cash-payment-bill"}
          className="mb-10 mt-8 text-[150px] text-success-500"
        />

        <h1 className="text-h3 font-bold text-success-600">
          Payment successful.
        </h1>

        <p className="mb-12 mt-4">
          Your transaction has been completed and your{" "}
          {planType == "monthly" ? "Monthly" : "Yearly"} subscription is now
          active. Thank you for your purchase!
        </p>

        <div className="mt-6 flex justify-center">
          <ButtonNext onClick={finishHandler}>Finish</ButtonNext>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessComponent;
