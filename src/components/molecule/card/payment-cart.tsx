import { CartType } from "../type";

const PaymentCardComponent = ({
  title,
  description,
  onClick,
  icon,
}: Partial<CartType>) => {
  return (
    <div
      className="relative h-[230px] w-[250px] max-w-md cursor-pointer rounded-xl border-2 border-primary-500 p-4 text-center text-primary-500 shadow-md backdrop-blur-sm hover:border-primary-500 hover:bg-primary-500 hover:text-white lg:h-[300px] lg:w-[300px]"
      onClick={onClick}
    >
      <h1 className="mb-6 text-title font-bold text-warning-500">{title}</h1>

      <p className="break-all font-semibold">{description}</p>

      <div className="absolute bottom-2 left-[33%] lg:bottom-10 lg:left-[35%]">
        {icon}
      </div>
    </div>
  );
};

export default PaymentCardComponent;
