"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { db } from "@/config";
import { Button, Icon } from "../../../imports";
import PageLoading from "@/src/components/atom/loading/page-loader";

const PaymentSuccessComponent = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { user, changeStep } = useAuth();

  const planType = params.get("planType");
  const sessionId = params.get("session_id");

  const now = dayjs().format("YYYY-MM-DD");
  const oneMonth = dayjs().add(1, "month").format("YYYY-MM-DD");
  const oneYear = dayjs().add(1, "year").format("YYYY-MM-DD");

  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!sessionId) return;

      try {
        const res = await fetch("/api/get-strip-with-session-id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();

        if (data.subscriptionId) {
          setSubscriptionId(data.subscriptionId);
        }
      } catch (err) {
        console.log("Error fetching subscription:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [sessionId]);

  const finishHandler = async () => {
    if (!user?.userId) {
      console.log("User not found");
      return;
    }

    if (!planType || !subscriptionId) {
      console.log("Missing planType or subscriptionId");
      return;
    }

    const setData = await updateDoc(doc(db, "users", user.userId), {
      payment: {
        freeTrialEnabled: false,
        trialEnd: now,
        isPaid: true,
        planType: planType,
        subscriptionId: subscriptionId,
        createdAt: now,
        endAt: planType === "monthly" ? oneMonth : oneYear,
      },
    });

    changeStep("0");

    router.push("/dashboard");
  };

  if (loading) return <PageLoading />;

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[600px] h-[500px]  p-6 border-2 border-amber-300 rounded-lg bg-white">
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
