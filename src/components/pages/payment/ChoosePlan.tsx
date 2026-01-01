// hooks
import { useIsMobile } from "@/src/hooks/mobile-size/use-is-mobile";

// ui
import ButtonBack from "@/src/components/atom/buttons-component/button-back";
import MyIcon from "@/src/components/atom/icon-components";
import MyImage from "@/src/components/atom/image-components";

// card
import PlanCardComponent from "@/src/components/molecule/cards/plan-cart";

// type
import { ChoosePlanSectionProps } from "../type";

const ChoosePlanComponent = ({
  onBack,
  onChoosePlan,
}: ChoosePlanSectionProps) => {
  // hook
  const isMobile = useIsMobile();

  return (
    <div className="relative">
      <MyImage
        src="/images/Wallet.svg"
        alt=""
        width={isMobile ? 150 : 200}
        height={isMobile ? 150 : 200}
        className="object-contain"
        wrapperClass="absolute w-full top-[-20px] flex justify-center items-center"
      />

      <div className="w-[90vw] rounded-xl border-2 border-warning-300 bg-white p-8 shadow-md lg:h-[600px] lg:w-[900px]">
        <div className="mb-[50px] flex w-full justify-start lg:mb-[135px]">
          <ButtonBack onClick={onBack} />
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4 lg:flex-row lg:gap-8">
          <PlanCardComponent
            title="Monthly"
            description="Try a month payment"
            price={10}
            onClick={() => onChoosePlan("monthly")}
            icon={
              <MyIcon icon="fluent:payment-20-filled" className="text-9xl" />
            }
          />

          <PlanCardComponent
            title="Yearly"
            description="Try a year payment"
            price={120}
            onClick={() => onChoosePlan("yearly")}
            icon={
              <MyIcon icon="fluent:payment-20-filled" className="text-9xl" />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ChoosePlanComponent;
