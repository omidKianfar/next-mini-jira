"use client";

import { useState } from "../imports";

import Step1Component from "./steps/step1";
import Step2Component from "./steps/step2";
import Step3Component from "./steps/step3";
import Step4Component from "./steps/step4";

const SignupComponent = () => {
  const [stepNumber, setStepNumber] = useState(() => {
    if (typeof window === "undefined") {
      return "0";
    }
    return localStorage.getItem("step") || "0";
  });

  const changeStep = (newStep: string) => {
    setStepNumber(newStep);
    localStorage.setItem("step", newStep);
  };

  const renderStep = () => {
    switch (stepNumber) {
      case "0":
        return <Step1Component changeStep={changeStep} />;
      case "1":
        return <Step2Component changeStep={changeStep} />;
      case "2":
        return <Step3Component changeStep={changeStep} />;
      case "3":
        return <Step4Component changeStep={changeStep} />;
    }
  };

  return renderStep();
};

export default SignupComponent;
