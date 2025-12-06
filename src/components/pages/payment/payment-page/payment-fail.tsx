"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Button, useAuth } from "../../imports";

const PaymentFailedComponent = () => {
  const router = useRouter();
  const { changeStep } = useAuth();

  const finishHandler = () => {
    changeStep("0");

    router.push("/payment");
  };

  return (
    <div className="w-full h-full lg:w-screen lg:h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full h-full lg:w-[600px] lg:h-[500px]  p-6 border-2 border-amber-300 rounded-lg bg-white shadow">
        <div className="flex justify-center mb-10 mt-8">
          <Icon
            icon={"streamline-freehand:cash-payment-bill"}
            className="text-[150px] text-amber-500"
          />
        </div>

        <h1 className=" font-bold text-3xl text-red-600 ">Payment failed.</h1>

        <p className=" mt-4 mb-6">
          Please check your card details or try another payment method. If the
          amount has been deducted from your account but the payment still shows
          as failed, please contact support for further assistance.
        </p>

        <div className="flex justify-center">
          <Button
            onClick={finishHandler}
            icon={
              <Icon
                icon="grommet-icons:link-next"
                width={16}
                className="ml-2 mt-1"
              />
            }
            className="mt-6 bg-blue-500 text-white border-2
                 hover:bg-transparent hover:border-blue-500
               hover:text-blue-500 rounded-lg px-8 py-2 
                transition-all duration-200"
          >
            Go To Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedComponent;
