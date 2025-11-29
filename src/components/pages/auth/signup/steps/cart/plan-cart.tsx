import { CartType } from "../../../type";

const PlanCartComponent = ({
  title,
  price,
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

      <p className="font-semibold mt-2">{`price: ${price}$`}</p>

      <div className="absolute left-[30%] bottom-8">{icon}</div>
    </div>
  );
};

export default PlanCartComponent;
