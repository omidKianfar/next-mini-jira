import React from "react";
import { TableProps } from "../type";

export function TableComponent<T>({ data, columns }: TableProps<T>) {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-white shadow-lg">
      <table className="w-full">
        <thead className="border border-dashed border-gray-400 bg-gray-300 shadow-md">
          <tr>
            {columns.map((col, idx) => {
              const head = col.head;

              return (
                <th key={idx} className="p-4 text-left ">
                  {typeof head === "function" ? head({} as T) : head}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {data.map((row: T, rowIndex) => (
            <tr key={rowIndex} className="border border-dashed border-gray-400 hover:bg-gray-100">
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
