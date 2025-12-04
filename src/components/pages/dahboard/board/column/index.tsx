import { ColumnProps } from "../type";
import { useDroppable } from "../../imports";

const ColumnComponent = ({ id, children }: ColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`w-80 bg-gray-100 mt-2 rounded-lg p-2 transition border-2 border-amber-300
      ${isOver ? "bg-blue-300" : "bg-white"}
      `}
      style={{
        minHeight: "100%",
        touchAction: "none",
      }}
    >
      <h1 className="mb-4 text-center capitalize font-bold lg:text-2xl text-white bg-blue-500 rounded-lg p-2">
        {id}
      </h1>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
};

export default ColumnComponent;
