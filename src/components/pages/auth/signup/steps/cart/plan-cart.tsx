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
      className="w-[250px] h-[230px] lg:w-[300px] lg:h-[300px] backdrop-blur-sm border-2 border-blue-500
       text-blue-500 rounded-lg max-w-md p-4 text-center
       hover:bg-blue-500 hover:border-blue-500
       hover:text-white cursor-pointer relative shadow"
      onClick={onClick}
    >
      <h1 className=" lg:mb-4 font-bold text-xl lg:text-3xl text-amber-500">
        {title}
      </h1>

      <p className="text-lg lg:text-2xl font-semibold  lg:mb-4">{`${price}$`}</p>

      <p className="break-all font-semibold">{description}</p>

      <div className="absolute left-[25%] lg:left-[30%] bottom-0 lg:bottom-8">
        {icon}
      </div>
    </div>
  );
};

export default PlanCartComponent;
