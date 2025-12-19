import dayjs from "dayjs";

// ui
import ButtonBack from "@/src/components/atom/button/button-back";

// type
import { ActivePaymentSectionProps } from "../../type";

const ActivePaymentComponent = ({
  payment,
  onBack,
  now,
}: ActivePaymentSectionProps) => {
  const remainingDays = Math.max(0, dayjs(payment?.endAt).diff(now, "day"));

  return (
    <div className="w-[90vw] rounded-xl border-2 border-warning-500 p-4 lg:w-[500px]">
      <div className="mb-4 flex items-center justify-start">
        <ButtonBack onClick={onBack} />
      </div>

      <div className="text-center">
        <p className="mb-4 text-title font-bold text-success-500">
          You Have Active Payment
        </p>

        <div className="flex flex-col items-start justify-start rounded-sm border border-dashed border-gray-400 bg-gray-200 p-4 shadow-md">
          <p className="mb-4 text-subtitle font-semibold capitalize text-primary-600">
            <span className="font-bold text-black">Status:</span> Active
          </p>

          <hr className="mb-4 w-full border border-dashed border-gray-300" />

          <p className="mb-4 text-subtitle font-semibold text-primary-600">
            <span className="font-bold capitalize text-black">Plan Type:</span>{" "}
            {payment?.planType === "monthly" ? "Monthly" : "Yearly"}
          </p>

          <hr className="mb-4 w-full border border-dashed border-gray-300" />

          <p className="text-subtitle font-semibold text-primary-600">
            <span className="font-bold capitalize text-black">Ends In:</span>{" "}
            {remainingDays} days
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivePaymentComponent;
