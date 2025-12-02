import {
  PaymentCartComponent,
  useAuth,
  Icon,
  Image,
  FramerMotion,
  BackButton,
  useIsMobile,
} from "../../imports";

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
            <BackButton onClick={BackProfile} />
          </div>

          <div className=" w-full flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-8">
            <PaymentCartComponent
              title="Terial Mode"
              description="You get 10 days of free access to the app."
              onClick={freeModeHandler}
              icon={<Icon icon={"tabler:free-rights"} className="text-8xl" />}
            />

            <PaymentCartComponent
              title="Payment Mode"
              description="Go to payment plan page"
              onClick={paymentModeHandler}
              icon={
                <Icon
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
