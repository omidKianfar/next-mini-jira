'use client';

import { CartType } from '@/src/types/global';

const PaymentCardComponent = ({
  title,
  description,
  onClick,
  icon,
}: CartType) => {
  return (
    <div
      className="group relative h-[200px] w-[80vw] max-w-md cursor-pointer rounded-lg border-2 border-gray-300 p-5 text-center text-primary-500 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-primary-500/90 hover:text-white lg:h-[320px] lg:w-[300px]"
      onClick={onClick}
    >
      <h1 className="mb-4 text-subtitle font-bold transition-colors duration-300 lg:mb-8 lg:text-title">
        {title}
      </h1>

      <p className="break-words text-label font-medium leading-relaxed opacity-90 lg:text-body">
        {description}
      </p>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transition-transform duration-300 group-hover:scale-110 lg:bottom-8">
        {icon}
      </div>
    </div>
  );
};

export default PaymentCardComponent;
