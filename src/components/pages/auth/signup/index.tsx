"use client";

import { useState } from "react";
import { AuthProps } from "../types";

import Step1Component from "./steps/step1";
import Step2Component from "./steps/step2";
import Step3Component from "./steps/step3";

const SignupComponent = ({ setPage }: AuthProps) => {
  const [stepNumber, setStepNumber] = useState<string>(() => {
    return localStorage.getItem("step") || "0";
  });

  console.log(localStorage.getItem("step"));

  const changeStep = (newStep: string) => {
    setStepNumber(newStep);
    localStorage.setItem("step", newStep);
  };

  const renderStep = () => {
    switch (stepNumber) {
      case "0":
        return <Step1Component setPage={setPage} changeStep={changeStep} />;
      case "1":
        return <Step2Component changeStep={changeStep}/>;
      case "2":
        return <Step3Component changeStep={changeStep}/>;
    }
  };

  return <>{renderStep()}</>;
};

export default SignupComponent;
