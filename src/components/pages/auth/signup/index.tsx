'use client';

import { lazy, Suspense } from 'react';
import { useAuth } from '@/src/hooks/auth/use-auth';
import PageLoading from '@/src/components/common/page-loading';

const SignupStep = lazy(() => import('./steps/signup-step'));
const ProfileStep = lazy(() => import('./steps/profile-step'));
const PaymentStep = lazy(() => import('./steps/payment-step'));
const PalnStep = lazy(() => import('./steps/paln-step'));
const PasswordStep = lazy(() => import('./steps/password-step'));

const stepsMap: Record<string, React.ComponentType> = {
  '0': SignupStep,
  '1': ProfileStep,
  '2': PaymentStep,
  '3': PalnStep,
  '4': PasswordStep,
};

const SignupComponent = () => {
  const { stepNumber } = useAuth();

  const StepComponent = stepsMap[stepNumber] || null;

  return (
    <Suspense fallback={<PageLoading />}>
      {StepComponent ? <StepComponent /> : null}
    </Suspense>
  );
};

export default SignupComponent;
