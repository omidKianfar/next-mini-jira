import { Suspense } from 'react';
import FramerMotion from '@/src/components/atom/animation-component';
import PageLoading from '@/src/components/common/page-loading';
import PaymentSuccessComponent from '@/src/components/pages/payment/payment-success';

const PaymentSuccessPage = () => {
  return (
    <FramerMotion>
      <Suspense fallback={<PageLoading />}>
        <PaymentSuccessComponent />
      </Suspense>
    </FramerMotion>
  );
};

export default PaymentSuccessPage;
