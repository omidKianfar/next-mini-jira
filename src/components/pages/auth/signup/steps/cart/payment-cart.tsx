import { CartType } from "../../../../type";

const PaymentCartComponent = ({
  title,
  description,
  onClick,
  icon,
}: Partial<CartType>) => {
  return (
    <div
      className="w-[250px] h-[230px] lg:w-[300px] lg:h-[300px] backdrop-blur-sm border-2 border-blue-500
       text-blue-500 rounded-lg max-w-md p-4 text-center
       hover:bg-blue-500 hover:border-blue-500
       hover:text-white cursor-pointer relative shadow"
      onClick={onClick}
    >
      <h1 className="mb-6 font-bold text-2xl text-amber-500">{title}</h1>

      <p className="break-all font-semibold">{description}</p>

      <div className="absolute left-[33%] lg:left-[35%] bottom-2 lg:bottom-10">{icon}</div>
    </div>
  );
};

export default PaymentCartComponent;
