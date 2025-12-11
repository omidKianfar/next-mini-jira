"use client";

import FramerMotion from "@/src/components/atom/animation";
import ButtonBack from "@/src/components/atom/button/button-back";
import MyIcon from "@/src/components/atom/icon";
import MyImage from "@/src/components/atom/image";
import PaymentCardComponent from "@/src/components/molecule/card/payment-cart";
import { useAuth } from "@/src/hooks/auth/use-auth";
import { useIsMobile } from "@/src/hooks/mobile-size";

const PaymentStep = () => {
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
      <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
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
            <ButtonBack onClick={BackProfile} />
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-4 lg:flex-row lg:gap-8">
            <PaymentCardComponent
              title="Terial Mode"
              description="You get 10 days of free access to the app."
              onClick={freeModeHandler}
              icon={<MyIcon icon={"tabler:free-rights"} className="text-8xl" />}
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
    </FramerMotion>
  );
};

export default PaymentStep;
