// type
import { TableProps } from "../type";

export function TableComponent<T>({ data, columns }: TableProps<T>) {
  return (
    <div className="w-full overflow-hidden rounded-lg border-2 border-warning-500 bg-white shadow-lg">
      <table className="w-full">
        <thead className="bg-gray-200 shadow-md border-b border-gray-300">
          <tr>
            {columns.map((col, idx) => {
              const head = col.head;

              return (
                <th key={idx} className="p-4 text-left">
                  {typeof head === "function" ? head({} as T) : head}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {data.map((row: T, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-t border-dashed border-gray-300 hover:bg-gray-100"
            >
              {columns.map((col, colIndex) => {
                const cell = col.column;

                return (
                  <td key={colIndex} className="px-4 py-2">
                    {typeof cell === "function" ? cell(row) : cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
