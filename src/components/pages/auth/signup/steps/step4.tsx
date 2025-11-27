"use client";

import { SignupProps } from "../../type";
import { PlanType } from "@/src/types/global";
import CartComponent from "./cart";

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
    <div className="w-screen h-screen p-4">
      <button
        type="button"
        className="border-2 rounded-sm px-8 py-2 cursor-pointer"
        onClick={BackToPlan}
      >
        Back
      </button>

      <div className="w-full h-full flex justify-center items-center gap-8">
        <CartComponent
          title="Monthly"
          description={`
            With this plan you pay monthly to use the app.

            price: 10$
          `}
          onClick={() => choosePlanHandler("monthly")}
        />

        <CartComponent
          title="Yearly"
          description={`
            With this plan you pay yearly to use the app.

            price: 120$
          `}
          onClick={() => choosePlanHandler("yearly")}
        />
      </div>
    </div>
  );
};

export default Step4Component;
