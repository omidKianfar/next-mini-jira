"use client";

import { usePlanAction } from "@/src/hooks/payment";
import {
  BackButton,
  FramerMotion,
  Icon,
  Image,
  PlanCartComponent,
  PlanType,
  useAuth,
  useIsMobile,
  useState,
} from "../../imports";
import PageLoading from "@/src/components/atom/loading/page-loader";

const PalnStep = () => {
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();

  const { changeStep } = useAuth();
  const { choosePlan } = usePlanAction();

  const BackToPlan = () => {
    changeStep("2");
  };

  const choosePlanHandler = async (selectedPlan: PlanType) => {
    setLoading(true);

    await choosePlan({ selectedPlan, setLoading });
  };

  if (loading) {
    return <PageLoading />;
  }

  return (
    <FramerMotion>
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <div className="absolute top-0">
          <Image
            src="/images/Wallet.svg"
            alt=""
            width={isMobile ? 150 : 300}
            height={isMobile ? 150 : 300}
            className="object-contain"
          />
        </div>

        <div className="w-[90vw] lg:w-[900px] lg:h-[600px] bg-white p-8 border-2 border-amber-300 rounded-lg ">
          <div className="w-full flex justify-start mb-[50px] lg:mb-[135px]">
            <BackButton onClick={BackToPlan} />
          </div>

          <div className=" w-full flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-8">
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
