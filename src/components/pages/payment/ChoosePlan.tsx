'use client';

import { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';
import MyImage from '../../atom/image-components';
import ButtonBack from '../../atom/buttons-component/button-back';
import PlanCardComponent from '../../molecule/cards/plan-cart';
import MyIcon from '../../atom/icon-components';
import { PlanType } from '@/src/types/global';

interface ChoosePlanSectionProps {
  onBack: () => void;
  onChoosePlan: (plan: PlanType) => void;
  isLoading?: boolean;
}

const ChoosePlanComponent = ({
  onBack,
  onChoosePlan,
  isLoading = false,
}: ChoosePlanSectionProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="relative w-[90vw] max-w-[840px] pt-12 lg:w-[900px]">
      <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/3">
        <MyImage
          src="/images/Wallet.svg"
          alt="Wallet Illustration"
          width={isMobile ? 120 : 160}
          height={isMobile ? 120 : 160}
          className="object-contain"
        />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 pt-12 shadow-md lg:p-10 lg:pt-16">
        <div className="mb-8 flex w-full justify-start lg:mb-12">
          <ButtonBack onClick={onBack} />
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-6 lg:flex-row lg:gap-8">
          <PlanCardComponent
            title="Monthly"
            description="Try a month payment"
            price={10}
            onClick={() => !isLoading && onChoosePlan('monthly')}
            icon={<MyIcon icon="monthly-payment" className="text-8xl" />}
          />

          <PlanCardComponent
            title="Yearly"
            description="Try a year payment"
            price={120}
            onClick={() => !isLoading && onChoosePlan('yearly')}
            icon={<MyIcon icon="yearly-payment" className="text-8xl" />}
          />
        </div>
      </div>
    </div>
  );
};

export default ChoosePlanComponent;
