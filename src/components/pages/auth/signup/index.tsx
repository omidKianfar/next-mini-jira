"use client";

import { lazy, Suspense } from "react";

// hooks
import { useAuth } from "@/src/hooks/auth/use-auth";

// ui
import PageLoading from "@/src/components/common/page-loading";

// lazy
const SignupStep = lazy(() => import("./steps/signup-step"));
const ProfileStep = lazy(() => import("./steps/profile-step"));
const PaymentStep = lazy(() => import("./steps/payment-step"));
const PalnStep = lazy(() => import("./steps/paln-step"));
const PasswordStep = lazy(() => import("./steps/password-step"));

const SignupComponent = () => {
  // hooks
  const { stepNumber } = useAuth();

  // pages
  const renderStep = () => {
    switch (stepNumber) {
      case "0":
        return <SignupStep />;
      case "1":
        return <ProfileStep />;
      case "2":
        return <PaymentStep />;
      case "3":
        return <PalnStep />;
      case "4":
        return <PasswordStep />;
      default:
        return null;
    }
  };

  return <Suspense fallback={<PageLoading />}>{renderStep()}</Suspense>;
};

export default SignupComponent;
