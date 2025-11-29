"use client";

import BackButton from "@/src/components/atom/button/back-button";
import {
  Button,
  Icon,
  PlanCartComponent,
  PlanType,
  SignupProps,
} from "../../imports";

const Step4Component = ({ changeStep }: Pick<SignupProps, "changeStep">) => {
  const BackToPlan = () => {
    changeStep("2");
  };

  const choosePlanHandler = async (selectedPlan: PlanType) => {
    const response = await fetch("/api/create-strip-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ planType: selectedPlan }),
    });

    const result = await response.json();

    if (result.url) {
      window.location.href = result.url;
    } else {
      console.log("Error creating Stripe session");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      <div className="w-[800px] h-[450px] bg-white p-8 border-2 border-amber-300 rounded-sm">
        <div className="w-full flex justify-start mb-8">
          <BackButton onClick={BackToPlan} />
        </div>

        <div className=" w-full flex justify-center items-center gap-8">
          <PlanCartComponent
            title="Monthly"
            description={"Monthly Payment"}
            price={10}
            onClick={() => choosePlanHandler("monthly")}
            icon={<Icon icon={"fluent:payment-20-filled"} className="text-9xl" />}
          />

          <PlanCartComponent
            title="Yearly"
            description={"Yearly Payment"}
            price={120}
            onClick={() => choosePlanHandler("yearly")}
            icon={<Icon icon={"fluent:payment-20-filled"} className="text-9xl" />}
          />
        </div>
      </div>
    </div>
  );
};

export default Step4Component;
