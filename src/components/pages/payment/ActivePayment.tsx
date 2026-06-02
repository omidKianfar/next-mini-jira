'use client';

import dayjs from 'dayjs';
import ButtonBack from '../../atom/buttons-component/button-back';

interface ActivePaymentSectionProps {
  payment: any;
  onBack: () => void;
  now: dayjs.Dayjs;
}

const ActivePaymentComponent = ({
  payment,
  now,
}: ActivePaymentSectionProps) => {
  const remainingDays = Math.max(0, dayjs(payment?.endAt).diff(now, 'day'));

  return (
    <div className="mx-auto mt-[28px] w-[90vw] max-w-[840px]">
      <div className="flex flex-col items-center justify-center">
        <p className="mb-6 text-center text-title font-bold tracking-tight text-gray-700">
          You Have An Active Subscription
        </p>

        <div className="w-full max-w-md rounded-2xl border border-warning-400 bg-gray-50 p-6 shadow-sm transition-all duration-300">
          <p className="mb-4 text-body font-semibold capitalize text-success-500">
            <span className="font-semibold text-gray-800">Status:</span> Active
          </p>

          <hr className="mb-4 w-full border-dashed border-gray-200" />

          <p className="mb-4 text-body font-semibold text-gray-500">
            <span className="font-semibold text-gray-800">Plan Type:</span>{' '}
            {payment?.planType === 'monthly' ? 'Monthly Plan' : 'Yearly Plan'}
          </p>

          <hr className="mb-4 w-full border-dashed border-gray-200" />

          <p className="text-body font-semibold text-gray-500">
            <span className="font-semibold text-gray-800">Ends In:</span>{' '}
            <span className="font-bold text-primary-500">{remainingDays}</span>{' '}
            days
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivePaymentComponent;
