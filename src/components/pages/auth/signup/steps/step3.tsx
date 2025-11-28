import { SignupProps } from "../../type";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";
import { doc, updateDoc } from "firebase/firestore";
import CartComponent from "./cart";
import dayjs from "dayjs";
import { db } from "@/config";

const Step3Component = ({ changeStep }: Pick<SignupProps, "changeStep">) => {
  const router = useRouter();
  const { user } = useAuth();
  console.log("user", user);

  const BackProfile = () => {
    changeStep("1");
  };

  const freeModeHandler = async () => {
    await updateDoc(doc(db, "users", user?.userId as string), {
      payment: {
        freeTrialEnabled: true,
        trialEnd: dayjs(new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)).format(
          "YYYY-MM-DD"
        ),
      },
    });

    router.push("/");
  };

  const paymentModeHandler = () => {
    changeStep("3");
  };

  return (
    <div className="w-screen h-screen p-4">
      <button
        type="button"
        className="border-2 rounded-sm px-8 py-2 cursor-pointer"
        onClick={BackProfile}
      >
        Back
      </button>

      <div className="w-full h-full flex justify-center items-center gap-8">
        <CartComponent
          title="Terial Mode"
          description=" With choose this plan you have 10 days free to using this app"
          onClick={freeModeHandler}
        />

        <CartComponent
          title="Payment Mode"
          description="Choose your payment plan"
          onClick={paymentModeHandler}
        />
      </div>
    </div>
  );
};

export default Step3Component;
