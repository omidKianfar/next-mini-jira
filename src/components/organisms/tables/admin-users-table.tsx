import { useState } from "react";

// ui
import { TableComponent } from "@/src/components/organisms/table-component";
import PaginationComponent from "@/src/components/organisms/pagination-component";
import { Cloumns } from "./cloumns";

// type
import { UsersTableProps } from "../type";

const UsersTable = ({ users, goDetail, toggleActive }: UsersTableProps) => {
  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const totalPages = Math.max(1, Math.ceil(users.length / pageSize));

  const safePage = Math.min(page, totalPages);

  const paginatedUsers = users.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  // columns data
  const columns = Cloumns({ goDetail, toggleActive });

  return (
    <div>
      <TableComponent data={paginatedUsers} columns={columns} />

      <PaginationComponent
        currentPage={safePage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
    </div>
  );
};

export default UsersTable;
