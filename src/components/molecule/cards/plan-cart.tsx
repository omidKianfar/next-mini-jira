// type
import { CartType } from "../type";

const PlanCardComponent = ({
  title,
  price,
  description,
  onClick,
  icon,
}: Partial<CartType>) => {
  return (
    <div
      className="relative h-[230px] w-[250px] max-w-md cursor-pointer rounded-xl border-2 border-primary-500 p-4 text-center text-primary-500 shadow-md backdrop-blur-sm hover:border-primary-500 hover:bg-primary-500 hover:text-white lg:h-[300px] lg:w-[300px]"
      onClick={onClick}
    >
      <h1 className="text-subtitle font-bold text-warning-500 lg:mb-4 lg:text-3xl">
        {title}
      </h1>

      <p className="text-lg font-semibold lg:mb-4 lg:text-2xl">{`${price}$`}</p>

      <p className="break-all font-semibold">{description}</p>

      <div className="absolute bottom-0 left-[25%] lg:bottom-8 lg:left-[30%]">
        {icon}
      </div>
    </div>
  );
};

export default PlanCardComponent;
