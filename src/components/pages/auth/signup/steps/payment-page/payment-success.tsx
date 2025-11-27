"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { db } from "@/src/store/slices/auth/methods";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";

const PaymentSuccessComponent = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { user } = useAuth();

  const planType = params.get("planType");
  const sessionId = params.get("session_id");


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

    await updateDoc(doc(db, "users", user.userId), {
      payment: {
        freeTrialEnabled: false,
        trialEndsAt: dayjs(new Date()).format("YYYY-MM-DD"),
        isPaid: true,
        planType: planType,
        subscriptionId: subscriptionId,
        createdAt: dayjs(new Date()).format("YYYY-MM-DD"),
      },
    });

    router.push("/");
  };

  if (loading) return <div>Processing your payment...</div>;

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">Payment Successful</h1>

      <p>Your subscription is now active.</p>

      <button
        onClick={finishHandler}
        className="px-6 py-3 bg-blue-600 text-white rounded-md"
      >
        Finish & Save
      </button>
    </div>
  );
};

export default PaymentSuccessComponent;
