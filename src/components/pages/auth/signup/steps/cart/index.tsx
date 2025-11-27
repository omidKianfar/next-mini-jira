import { CartType } from "../../../type";

const CartComponent = ({ title, description, onClick }: Partial<CartType>) => {
  return (
    <div
      className="w-[300px] h-[300px] border-2 rounded-sm  
      flex flex-col justify-between items-center max-w-md 
      p-4 text-center hover:bg-amber-50 cursor-pointer"
      onClick={onClick}
    >
      <h1>{title}</h1>

      <p className="break-all">{description}</p>
    </div>
  );
};

export default CartComponent;
