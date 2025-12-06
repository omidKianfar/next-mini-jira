import { ColumnProps } from "../type";
import { useDroppable } from "../../imports";

const ColumnComponent = ({ id, children }: ColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`w-full lg:w-80 bg-gray-100  rounded-lg  transition border-2 border-blue-300 shadow-2xl
      ${isOver ? "bg-blue-300" : "bg-white"}
      `}
      style={{
        minHeight: "100%",
        touchAction: "none",
      }}
    >
      <h1 className="mb-2 text-center capitalize font-bold  text-white bg-blue-500 rounded-t-lg p-2 shadow">
        {id}
      </h1>
      
      <div className="flex flex-col gap-2 p-2">{children}</div>
    </div>
  );
};

export default ColumnComponent;
