"use client";

import { useAuth } from "../imports";

import Step1Component from "./steps/step1";
import Step2Component from "./steps/step2";
import Step3Component from "./steps/step3";
import Step4Component from "./steps/step4";

const SignupComponent = () => {
  const { stepNumber } = useAuth();

  const renderStep = () => {
    switch (stepNumber) {
      case "0":
        return <Step1Component />;
      case "1":
        return <Step2Component />;
      case "2":
        return <Step3Component />;
      case "3":
        return <Step4Component />;
      default:
        return null;
    }
  };

  return renderStep();
};

export default SignupComponent;
