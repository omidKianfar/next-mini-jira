import {
  PaymentCartComponent,
  dayjs,
  db,
  doc,
  updateDoc,
  useAuth,
  useRouter,
  Icon,
  useSnackbar,
  Image,
  FramerMotion,
  BackButton,
} from "../../imports";

const Step3Component = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { user,changeStep } = useAuth();

  const BackProfile = () => {
    changeStep("1");
  };

  const freeModeHandler = async () => {
    try {
      await updateDoc(doc(db, "users", user?.userId as string), {
        payment: {
          freeTrialEnabled: true,
          trialEnd: dayjs().add(10, "day").format("YYYY-MM-DD"),
        },
      });

      enqueueSnackbar("Terial Mode is Active", { variant: "success" });

      changeStep("0");

      router.push("/dashboard");
    } catch (error: any) {
      enqueueSnackbar(`Error: ${error?.message || error}. Please try again.`, {
        variant: "error",
      });
    }
  };

  const paymentModeHandler = () => {
    changeStep("3");
  };

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
            <BackButton onClick={BackProfile} />
          </div>

          <div className=" w-full flex justify-center items-center gap-8">
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

export default Step3Component;
