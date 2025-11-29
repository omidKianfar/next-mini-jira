import BackButton from "@/src/components/atom/button/back-button";
import {
  PaymentCartComponent,
  dayjs,
  db,
  doc,
  SignupProps,
  updateDoc,
  useAuth,
  useRouter,
  Icon,
  useSnackbar,
} from "../../imports";

const Step3Component = ({ changeStep }: Pick<SignupProps, "changeStep">) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();

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
    <div className="w-screen h-screen flex justify-center items-center ">
      <div className="w-[800px] h-[450px] bg-white p-8 border-2 border-amber-300 rounded-sm">
        <div className="w-full flex justify-start mb-8">
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
            icon={<Icon icon={"streamline:payment-10-solid"} className="text-8xl" />}
          />
        </div>
      </div>
    </div>
  );
};

export default Step3Component;
