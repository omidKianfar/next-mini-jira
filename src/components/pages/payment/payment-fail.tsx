'use client';

import { useAuth } from '@/src/hooks/auth/use-auth';
import { useNavigation } from '@/src/hooks/navigation/use-navigation';
import { useRequireActiveStatus } from '@/src/hooks/pages-user-status-require/use-require-active-status';
import MyIcon from '../../atom/icon-components';
import ButtonNext from '../../atom/buttons-component/button-next';

const PaymentFailedComponent = () => {
  const navigation = useNavigation();
  const { changeStep } = useAuth();

  useRequireActiveStatus();

  const handleRetry = () => {
    changeStep('0');
    navigation.payment();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/80 p-4">
      <div className="w-full max-w-[500px] rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl">
        <MyIcon
          icon="alert-circle"
          className="mx-auto mb-6 text-[80px] text-error-500"
        />

        <h1 className="text-2xl font-bold text-gray-800">
          Payment Unsuccessful
        </h1>

        <p className="mt-4 leading-relaxed text-gray-500">
          We couldn't process your payment. Please verify your card details or
          try a different payment method. If you're still having trouble, our
          support team is here to help.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <ButtonNext
            onClick={handleRetry}
            className="w-full"
            icon={<MyIcon icon="refresh" className="ml-2" />}
          >
            Try Again
          </ButtonNext>

          <button
            onClick={() => navigation.contact()}
            className="text-sm font-medium text-gray-400 transition-colors hover:text-gray-600"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedComponent;
