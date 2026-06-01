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
      className="group relative h-[250px] w-[260px] max-w-md cursor-pointer rounded-2xl border-2 border-primary-500 p-5 text-center text-primary-500 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-primary-500 hover:text-white lg:h-[320px] lg:w-[300px]"
      onClick={onClick}
    >
      <h1 className="mb-4 text-h4 font-extrabold text-warning-500 transition-colors duration-300 group-hover:text-warning-400">
        {title}
      </h1>

      <p className="break-words text-label font-medium leading-relaxed opacity-90">
        {description}
      </p>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transition-transform duration-300 group-hover:scale-110 lg:bottom-8">
        {icon}
      </div>
    </div>
  );
};

export default PaymentCardComponent;
