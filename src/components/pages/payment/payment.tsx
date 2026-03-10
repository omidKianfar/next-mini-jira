'use client';

import { lazy } from 'react';

import {
  Suspense,
  useState,
  usePathname,
  useAuth,
  dayjs,
  useNavigation,
  PageLoading,
  FramerMotion,
  PlanType,
  useRequireActiveStatus,
  usePlanAction,
} from '../imports';

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
    payment?.endAt && now.isBefore(payment.endAt)
  );

  const BackToPlan = () => {
    if (isSignupPage) {
      changeStep('2');
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
    <Suspense fallback={<PageLoading />}>
      <FramerMotion>
        <div
          className={`flex w-full flex-col items-center justify-center p-4 ${
            isSignupPage ? 'min-h-screen' : ''
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
