"use client";

// type
import { PaginationProps } from "../type";

const PaginationComponent = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  const getPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    if (currentPage <= 3) return [1, 2, 3, 4, "...", totalPages];
    if (currentPage >= totalPages - 2)
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <div className="flex justify-center gap-2 rounded-md border border-dashed border-gray-400 bg-white p-2 shadow-md lg:flex-row">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="rounded border-2 border-gray-300 bg-gray-300 px-3 py-1 disabled:opacity-50"
        >
          {"<<"}
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded border-2 border-gray-300 bg-gray-300 px-3 py-1 disabled:opacity-50"
        >
          {"<"}
        </button>

        {getPages().map((p, i) =>
          p === "..." ? (
            <span key={i} className="px-3 py-1 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`rounded border-2 border-gray-300 px-3 py-1 ${
                p === currentPage
                  ? "bg-primary-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded border-2 border-gray-300 bg-gray-300 px-3 py-1 disabled:opacity-50"
        >
          {">"}
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="rounded border-2 border-gray-300 bg-gray-300 px-3 py-1 disabled:opacity-50"
        >
          {">>"}
        </button>
      </div>

      <div className="rounded-md border border-dashed border-gray-400 bg-white p-2 shadow-md">
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="cursor-pointer rounded border border-gray-300 px-2 py-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default PaginationComponent;
