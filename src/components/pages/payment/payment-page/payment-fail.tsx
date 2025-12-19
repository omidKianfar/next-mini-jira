"use client";

// hook
import { useNavigation } from "@/src/hooks/navigation";
import { useRequireActiveStatus } from "@/src/hooks/pages-user-status-require/use-require-active-status";
import { useRequirePaymentStatus } from "@/src/hooks/pages-user-status-require/use-require-payment-status";

// ui
import ButtonNext from "@/src/components/atom/button/button-next";
import MyIcon from "@/src/components/atom/icon";
import { useAuth } from "@/src/hooks/auth/use-auth";

const PaymentFailedComponent = () => {
  // hook
  const navigation = useNavigation();
  const { changeStep } = useAuth();

  useRequireActiveStatus();
  useRequirePaymentStatus();

  // functions
  const finishHandler = () => {
    changeStep("0");

    navigation.payment();
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="h-screen w-screen rounded-xl border-warning-300 bg-white p-6 shadow-md lg:h-[500px] lg:w-[600px] lg:border-2">
        <MyIcon
          icon={"streamline-freehand:cash-payment-bill"}
          className="mb-10 mt-8 text-[150px] text-warning-500"
        />

        <h1 className="text-h3 font-bold text-error-600">Payment failed.</h1>

        <p className="mb-6 mt-4">
          Please check your card details or try another payment method. If the
          amount has been deducted from your account but the payment still shows
          as failed, please contact support for further assistance.
        </p>

        <div className="mt-6 flex justify-center">
          <ButtonNext
            onClick={finishHandler}
            icon={
              <MyIcon icon={"maki:arrow"} className="ml-2 mt-1 text-body" />
            }
          >
            Go To Payment
          </ButtonNext>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedComponent;
