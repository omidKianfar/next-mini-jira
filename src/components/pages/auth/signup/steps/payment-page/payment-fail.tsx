"use client";

import { useRouter } from "next/navigation";

const PaymentFailedComponent = () => {
  const router = useRouter();

  const finishHandler = () => {
    router.push("/payment");
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">Payment failed</h1>

      <p>Your subscription is failed.</p>

      <button
        onClick={finishHandler}
        className="px-6 py-3 bg-blue-600 text-white rounded-md"
      >
        Finish
      </button>
    </div>
  );
};

export default PaymentFailedComponent;
