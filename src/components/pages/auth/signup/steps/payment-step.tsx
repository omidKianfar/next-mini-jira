"use client";

import FramerMotion from "@/src/components/atom/animation";
import ButtonBack from "@/src/components/atom/button/button-back";
import MyIcon from "@/src/components/atom/icon";
import MyImage from "@/src/components/atom/image";
import PaymentCardComponent from "@/src/components/molecule/card/payment-cart";
import { useAuth } from "@/src/hooks/auth/use-auth";
import { useIsMobile } from "@/src/hooks/mobile-size";
import { usePathname } from "next/navigation";

const PaymentStep = () => {
  const pathName = usePathname();
  const { user, changeStep, terialMode } = useAuth();
  const isMobile = useIsMobile();

  const BackProfile = () => {
    changeStep("1");
  };

  const freeModeHandler = async () => {
    try {
      await terialMode({ userId: user?.userId as string });
    } catch (error: any) {
      console.log("Terial Mode Error: ", error);
    }
  };

  const paymentModeHandler = () => {
    changeStep("3");
  };

  return (
    <FramerMotion>
      <div
        className={`relative flex w-full flex-col items-center justify-center p-4 ${pathName.includes("/signup") && "min-h-screen"}`}
      >
        <div className="relative">
          <MyImage
            src="/images/Wallet.svg"
            alt=""
            width={isMobile ? 150 : 200}
            height={isMobile ? 150 : 200}
            className="object-contain"
            wrapperClass="absolute w-full top-[-20px] flex justify-center items-center"
          />

          <div className="w-[90vw] rounded-xl border-2 border-warning-300 bg-white p-8 shadow-md lg:h-[600px] lg:w-[900px]">
            <div className="mb-[50px] flex w-full justify-start lg:mb-[135px]">
              <ButtonBack onClick={BackProfile} />
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-4 lg:flex-row lg:gap-8">
              <PaymentCardComponent
                title="Terial Mode"
                description="You get 10 days of free access to the app."
                onClick={freeModeHandler}
                icon={
                  <MyIcon icon={"tabler:free-rights"} className="text-8xl" />
                }
              />

              <PaymentCardComponent
                title="Payment Mode"
                description="Go to payment plan page"
                onClick={paymentModeHandler}
                icon={
                  <MyIcon
                    icon={"streamline:payment-10-solid"}
                    className="text-8xl"
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </FramerMotion>
  );
};

export default PaymentStep;
