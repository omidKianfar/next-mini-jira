import { CartType } from '@/src/types/global';

const PlanCardComponent = ({
  title,
  price,
  description,
  onClick,
  icon,
}: CartType) => {
  return (
    <div
      className="relative h-[230px] w-[250px] max-w-md cursor-pointer rounded-xl border-2 border-primary-500 p-4 text-center text-primary-500 shadow-md backdrop-blur-sm hover:border-primary-500 hover:bg-primary-500 hover:text-white lg:h-[300px] lg:w-[300px]"
      onClick={onClick}
    >
      <h1 className="mb-4 text-subtitle font-bold text-warning-500 lg:text-3xl">
        {title}
      </h1>

      <p className="mb-2 text-title font-semibold lg:text-2xl">{`${price}$`}</p>

      <p className="break-all font-semibold">{description}</p>

      <div className="absolute bottom-0 left-[30%] lg:bottom-8 lg:left-[35%]">
        {icon}
      </div>
    </div>
  );
};

export default PlanCardComponent;
