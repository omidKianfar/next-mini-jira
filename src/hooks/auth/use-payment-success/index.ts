"use client";

import { useEffect } from "react";
import { UsePaymentSuccessProps } from "../../type";

export const useSetSubscriptionId = ({
  sessionId,
  setLoading,
  setSubscriptionId,
}: UsePaymentSuccessProps) => {
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
};
