'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { routes } from '@/src/helper/routes/routes';

interface UsePaymentSuccessProps {
  sessionId: string | null;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSubscriptionId: Dispatch<SetStateAction<string | null>>;
}

export const useSetSubscriptionId = ({
  sessionId,
  setLoading,
  setSubscriptionId,
}: UsePaymentSuccessProps) => {
  useEffect(() => {
    const fetchSubscription = async () => {
      if (!sessionId) return;

      try {
        const res = await fetch(routes.api.getStripWithSessionId, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();

        if (data.subscriptionId) {
          setSubscriptionId(data.subscriptionId);
        }
      } catch (err) {
        console.log('Error fetching subscription:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [sessionId]);
};
