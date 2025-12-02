"use client";

import { useState } from "react";
import { useAuth } from "@/src/hooks/auth/use-auth";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { Button, Icon } from "../../../imports";
import PageLoading from "@/src/components/atom/loading/page-loader";
import { updateFirestoreUser } from "@/src/lib/auth/update-user";
import { useSetSubscriptionId } from "@/src/hooks/auth/use-payment-success";

const PaymentSuccessComponent = () => {
  const router = useRouter();
  const params = useSearchParams();
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

    await updateFirestoreUser(user.userId, {
      "payment.freeTrialEnabled": false,
      "payment.trialEnd": now,
      "payment.isPaid": true,
      "payment.planType": planType,
      "payment.subscriptionId": subscriptionId,
      "payment.createdAt": now,
      "payment.endAt": planType === "monthly" ? oneMonth : oneYear,
    });

    changeStep("0");

    router.push("/dashboard");
  };

  if (loading) return <PageLoading />;

  return (
    <div className="w-full h-full lg:w-screen lg:h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full h-full lg:w-[600px] lg:h-[500px]  p-6 border-2 border-amber-300 rounded-lg bg-white">
        <div className="flex justify-center mb-10 mt-8">
          <Icon
            icon={"streamline-freehand:cash-payment-bill"}
            className="text-[150px] text-green-500"
          />
        </div>

        <h1 className=" font-bold text-3xl text-green-600 ">
          Payment successful.
        </h1>

        <p className=" mt-4 mb-12">
          Your transaction has been completed and your{" "}
          {planType == "monthly" ? "Monthly" : "Yearly"} subscription is now
          active. Thank you for your purchase!
        </p>

        <div className="flex justify-center">
          <Button
            onClick={finishHandler}
            className="mt-6 bg-blue-500 text-white border-2
                 hover:bg-transparent hover:border-blue-500
               hover:text-blue-500 rounded-lg px-8 py-2 
                transition-all duration-200"
          >
            Finish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessComponent;
