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
  onBack,
  now,
}: ActivePaymentSectionProps) => {
  const remainingDays = Math.max(0, dayjs(payment?.endAt).diff(now, 'day'));

  return (
    <div className="mx-auto w-[90vw] max-w-[840px]">
      <div className="mb-8 flex items-center justify-start md:mb-12">
        <ButtonBack onClick={onBack} />
      </div>

      <div className="flex flex-col items-center justify-center">
        <p className="mb-6 text-h4 font-extrabold tracking-tight text-success-600">
          You Have An Active Subscription
        </p>

        <div className="w-full max-w-md rounded-2xl border border-warning-400 bg-gray-50 p-6 shadow-sm transition-all duration-300">
          <p className="mb-4 text-body font-semibold capitalize text-gray-700">
            <span className="font-bold text-gray-900">Status:</span> Active
          </p>

          <hr className="mb-4 w-full border-dashed border-gray-200" />

          <p className="mb-4 text-body font-semibold text-gray-700">
            <span className="font-bold capitalize text-gray-900">
              Plan Type:
            </span>{' '}
            {payment?.planType === 'monthly' ? 'Monthly Plan' : 'Yearly Plan'}
          </p>

          <hr className="mb-4 w-full border-dashed border-gray-200" />

          <p className="text-body font-semibold text-gray-700">
            <span className="font-bold capitalize text-gray-900">Ends In:</span>{' '}
            <span className="font-bold text-warning-600">{remainingDays}</span>{' '}
            days
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivePaymentComponent;
