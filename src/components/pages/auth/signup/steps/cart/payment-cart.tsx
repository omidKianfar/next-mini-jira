import { CartType } from "../../../type";

const PaymentCartComponent = ({
  title,
  description,
  onClick,
  icon,
}: Partial<CartType>) => {
  return (
    <div
      className="w-[300px] h-[300px] border-2 border-blue-500
       text-blue-500 rounded-sm max-w-md p-4 text-center
       hover:bg-blue-500 hover:border-blue-500
       hover:text-white cursor-pointer relative"
      onClick={onClick}
    >
      <h1 className="mb-6 font-bold text-2xl text-amber-500">{title}</h1>

      <p className="break-all font-semibold">{description}</p>

      <div className="absolute left-[35%] bottom-10">{icon}</div>
    </div>
  );
};

export default PaymentCartComponent;
