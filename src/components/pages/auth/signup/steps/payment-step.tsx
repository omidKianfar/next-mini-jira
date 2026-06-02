'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/src/hooks/auth/use-auth';
import { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';
import FramerMotion from '@/src/components/atom/animation-component';
import ButtonBack from '@/src/components/atom/buttons-component/button-back';
import MyIcon from '@/src/components/atom/icon-components';
import MyImage from '@/src/components/atom/image-components';
import PaymentCardComponent from '@/src/components/molecule/cards/payment-cart';

const PaymentStep = () => {
  const pathName = usePathname();
  const { user, changeStep, terialMode } = useAuth();
  const isMobile = useIsMobile();

  const handleBackProfile = () => {
    changeStep('1');
  };

  const handleFreeMode = async () => {
    try {
      if (terialMode) {
        await terialMode({ userId: user?.userId as string });
      }
    } catch (error: any) {}
  };

  const handlePaymentMode = () => {
    changeStep('3');
  };

  return (
    <FramerMotion>
      <div
        className={`flex w-full flex-col items-center justify-center p-4 ${
          pathName.includes('/signup') && 'min-h-screen'
        }`}
      >
        <div className="relative w-[90vw] max-w-[840px] pt-12">
          <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/3">
            <MyImage
              src="/images/Wallet.svg"
              alt="Wallet Illustration"
              width={isMobile ? 120 : 160}
              height={isMobile ? 120 : 160}
              className="object-contain"
            />
          </div>

          <div className="rounded-2xl border border-gray-300 bg-white p-6 pt-12 shadow-sm lg:p-10 lg:pt-16">
            <div className="mb-8 flex w-full justify-start lg:mb-12">
              <ButtonBack onClick={handleBackProfile} />
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-6 lg:flex-row lg:gap-8">
              <PaymentCardComponent
                title="Trial Mode"
                description="You get 10 days of free access to the app."
                onClick={handleFreeMode}
                icon={<MyIcon icon="terial" className="text-7xl lg:text-8xl" />}
              />

              <PaymentCardComponent
                title="Payment Mode"
                description="Go to payment plan page"
                onClick={handlePaymentMode}
                icon={
                  <MyIcon icon="cash-alot" className="text-7xl lg:text-8xl" />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </FramerMotion>
  );
};

export default PaymentStep;
