'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { useAuth } from '@/src/hooks/auth/use-auth';
import { useNavigation } from '@/src/hooks/navigation/use-navigation';
import { useRequireActiveStatus } from '@/src/hooks/pages-user-status-require/use-require-active-status';
import { useSetSubscriptionId } from '@/src/hooks/payment/useSetSubscriptionId';
import { updateFirestoreUser } from '@/src/libs/auth/update-user';
import PageLoading from '../../common/page-loading';
import MyIcon from '../../atom/icon-components';
import ButtonNext from '../../atom/buttons-component/button-next';

const PaymentSuccessComponent = () => {
  const params = useSearchParams();
  const navigation = useNavigation();
  const { user, changeStep } = useAuth();

  useRequireActiveStatus();

  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFinishing, setIsFinishing] = useState(false);

  const planType = params.get('planType');
  const sessionId = params.get('session_id');

  const dates = useMemo(() => {
    const now = dayjs();
    return {
      createdAt: now.format('YYYY-MM-DD'),
      endAt:
        planType === 'monthly'
          ? now.add(1, 'month').format('YYYY-MM-DD')
          : now.add(1, 'year').format('YYYY-MM-DD'),
    };
  }, [planType]);

  useSetSubscriptionId({ sessionId, setLoading, setSubscriptionId });

  const finishHandler = async () => {
    if (!user?.userId || !planType || !subscriptionId) return;

    setIsFinishing(true);

    try {
      const data = {
        payment: {
          freeTrialEnabled: false,
          trialEnd: dates.createdAt,
          isPaid: true,
          planType,
          subscriptionId,
          createdAt: dates.createdAt,
          endAt: dates.endAt,
        },
      };

      await updateFirestoreUser(user.userId, data);
      changeStep('0');
      navigation.dashboard();
    } catch (error) {
      console.error('Failed to update subscription:', error);
      setIsFinishing(false);
    }
  };

  if (loading) return <PageLoading />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/80 p-4">
      <div className="w-full max-w-[500px] rounded-2xl border border-gray-300 bg-white p-8 text-center shadow-lg">
        <MyIcon
          icon="check-circle"
          className="mx-auto mb-6 text-[80px] text-success-500"
        />

        <h1 className="text-2xl font-bold text-green-500">
          Payment successful!
        </h1>
        <p className="mt-2 text-gray-500">
          Your {planType === 'monthly' ? 'Monthly' : 'Yearly'} subscription is
          active. Thank you for trusting us.
        </p>

        <div className="mt-8 flex items-center justify-center">
          <ButtonNext
            onClick={finishHandler}
            isLoading={isFinishing}
            disable={isFinishing || !user || !subscriptionId}
            className="w-full lg:w-[300px]"
          >
            {isFinishing ? 'Processing...' : 'Continue to Dashboard'}
          </ButtonNext>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessComponent;
