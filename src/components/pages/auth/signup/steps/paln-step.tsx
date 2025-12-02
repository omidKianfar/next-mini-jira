"use client";

import {
  BackButton,
  FramerMotion,
  Icon,
  Image,
  PlanCartComponent,
  PlanType,
  useAuth,
  useState,
} from "../../imports";
import PageLoading from "@/src/components/atom/loading/page-loader";

const PalnStep = () => {
  const [loading, setLoading] = useState(false);

  const { changeStep } = useAuth();

  const BackToPlan = () => {
    changeStep("2");
  };

  const choosePlanHandler = async (selectedPlan: PlanType) => {
    setLoading(true);

    try {
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
        setLoading(false);
      }
    } catch (error) {
      console.log("Error: ", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoading />;
  }

  return (
    <FramerMotion>
      <div className="w-screen h-screen flex justify-center items-center relative">
        <div className="absolute top-0">
          <Image
            src="/images/Wallet.svg"
            alt=""
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        <div className="w-[900px] h-[600px] bg-white p-8 border-2 border-amber-300 rounded-lg ">
          <div className="w-full flex justify-start mb-[135px]">
            <BackButton onClick={BackToPlan} />
          </div>

          <div className=" w-full flex justify-center items-center gap-8">
            <PlanCartComponent
              title="Monthly"
              description={"Try a month payment"}
              price={10}
              onClick={() => choosePlanHandler("monthly")}
              icon={
                <Icon icon={"fluent:payment-20-filled"} className="text-9xl" />
              }
            />

            <PlanCartComponent
              title="Yearly"
              description={"Try a year payment"}
              price={120}
              onClick={() => choosePlanHandler("yearly")}
              icon={
                <Icon icon={"fluent:payment-20-filled"} className="text-9xl" />
              }
            />
          </div>
        </div>
      </div>
    </FramerMotion>
  );
};

export default PalnStep;
