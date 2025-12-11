"use client";

import { useAuth } from "@/src/hooks/auth/use-auth";
import { useIsMobile } from "@/src/hooks/mobile-size";
import { useRequireActiveStatus } from "@/src/hooks/pages-user-status-require/use-require-active-status";
import { usePlanAction } from "@/src/hooks/payment";
import { PlanType } from "@/src/types/global";
import { useState } from "react";
import PageLoading from "../../organisms/page-loading";
import FramerMotion from "../../atom/animation";
import MyImage from "../../atom/image";
import ButtonBack from "../../atom/button/button-back";
import MyIcon from "../../atom/icon";
import PlanCardComponent from "../../molecule/card/plan-cart";
import { usePathname } from "next/navigation";
import { useNavigation } from "@/src/hooks/navigation";
import dayjs from "dayjs";

const PalnComponent = () => {
  const pathName = usePathname();

  const isMobile = useIsMobile();
  const navigation = useNavigation();
  const { changeStep, user } = useAuth();
  const { choosePlan } = usePlanAction();

  const now = dayjs();

  const [loading, setLoading] = useState(false);

  useRequireActiveStatus();

  const BackToPlan = () => {
    if (pathName.includes("signup")) {
      changeStep("2");
    } else {
      navigation.dashboard();
    }
  };

  const BackDashboard = () => {
    navigation.dashboard();
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
      <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
        {pathName.includes("payment") && now.isAfter(user?.payment?.endAt) ? (
          <div className="w-[90vw] rounded-xl border-2 border-warning-500 p-4 lg:w-[500px]">
            <div className="mb-4 flex items-center justify-start">
              <ButtonBack onClick={BackDashboard} />
            </div>

            <div className="text-center">
              <p className="mb-8 text-title font-bold text-success-500">
                You Have Active Payment
              </p>

              <div className="flex flex-col items-start justify-start rounded-sm bg-gray-200 p-4 shadow-md">
                <p className="mb-4 text-subtitle capitalize text-primary-600">
                  <span className="font-bold text-black">Status:</span> Active
                </p>

                <p className="mb-4 text-subtitle text-primary-600">
                  <span className="font-bold capitalize text-black">
                    Plan Type:
                  </span>{" "}
                  {user?.payment.planType == "monthly" ? "Monthly" : "Yearly"}
                </p>

                <p className="text-subtitle text-primary-600">
                  <span className="font-bold capitalize text-black">end:</span>{" "}
                  {dayjs(now).diff(dayjs(user?.payment?.endAt), "day") * -1 +
                    " days"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <MyImage
              src="/images/Wallet.svg"
              alt=""
              width={isMobile ? 150 : 300}
              height={isMobile ? 150 : 300}
              className="object-contain"
              wrapperClass="absolute top-0"
            />

            <div className="w-[90vw] rounded-xl border-2 border-warning-300 bg-white p-8 shadow-md lg:h-[600px] lg:w-[900px]">
              <div className="mb-[50px] flex w-full justify-start lg:mb-[135px]">
                <ButtonBack onClick={BackToPlan} />
              </div>

              <div className="flex w-full flex-col items-center justify-center gap-4 lg:flex-row lg:gap-8">
                <PlanCardComponent
                  title="Monthly"
                  description={"Try a month payment"}
                  price={10}
                  onClick={() => choosePlanHandler("monthly")}
                  icon={
                    <MyIcon
                      icon={"fluent:payment-20-filled"}
                      className="text-9xl"
                    />
                  }
                />

                <PlanCardComponent
                  title="Yearly"
                  description={"Try a year payment"}
                  price={120}
                  onClick={() => choosePlanHandler("yearly")}
                  icon={
                    <MyIcon
                      icon={"fluent:payment-20-filled"}
                      className="text-9xl"
                    />
                  }
                />
              </div>
            </div>
          </>
        )}
      </div>
    </FramerMotion>
  );
};

export default PalnComponent;
