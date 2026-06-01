'use client';

import { usePathname } from 'next/navigation';
import { lazy, Suspense, useState } from 'react';
import dayjs from 'dayjs';
import { useAuth } from '@/src/hooks/auth/use-auth';
import { useNavigation } from '@/src/hooks/navigation/use-navigation';
import { useRequireActiveStatus } from '@/src/hooks/pages-user-status-require/use-require-active-status';
import { usePlanAction } from '@/src/hooks/payment/usePlanAction';
import PageLoading from '../../common/page-loading';
import FramerMotion from '../../atom/animation-component';
import { PlanType } from '@/src/types/global';

const ActivePaymentComponent = lazy(() => import('./ActivePayment'));
const ChoosePlanComponent = lazy(() => import('./ChoosePlan'));

const PlanComponent = () => {
  const pathName = usePathname();
  const navigation = useNavigation();
  const { changeStep, user } = useAuth();
  const { choosePlan } = usePlanAction();

  useRequireActiveStatus();

  const [loading, setLoading] = useState(false);

  const now = dayjs();

  const isSignupPage = pathName.includes('/signup');
  const isDashboard = pathName.includes('/dashboard');

  const payment = user?.payment;
  const hasActivePayment = Boolean(
    payment?.endAt && now.isBefore(dayjs(payment.endAt))
  );

  const handleBackToPlan = () => {
    if (isSignupPage) {
      changeStep('2');
    } else {
      navigation.dashboard();
    }
  };

  const handleBackDashboard = () => navigation.dashboard();

  const choosePlanHandler = async (selectedPlan: PlanType) => {
    setLoading(true);

    try {
      await choosePlan({ selectedPlan, setLoading });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<PageLoading />}>
      <FramerMotion>
        <div
          className={`relative flex w-full flex-col items-center justify-center ${
            isSignupPage ? 'min-h-screen' : ''
          }`}
        >
          {loading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center rounded-xl bg-white/60 backdrop-blur-[1px] transition-all duration-200">
              <PageLoading />
            </div>
          )}

          {isDashboard && hasActivePayment ? (
            <ActivePaymentComponent
              payment={payment}
              onBack={handleBackDashboard}
              now={now}
            />
          ) : (
            <ChoosePlanComponent
              onBack={handleBackToPlan}
              onChoosePlan={choosePlanHandler}
              isLoading={loading}
            />
          )}
        </div>
      </FramerMotion>
    </Suspense>
  );
};

export default PlanComponent;
