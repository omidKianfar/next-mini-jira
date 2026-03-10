import {
  LoadingCircle,
  PaginationComponent,
  TableComponent,
  useState,
} from '../imports';
import { Cloumns } from './cloumns';
import { UsersTableProps } from '../type';

const UsersTable = ({ users, goDetail, toggleActive }: UsersTableProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const totalPages = Math.max(1, Math.ceil(users.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginatedUsers = users.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  const columns = Cloumns({ goDetail, toggleActive });

  if (!users)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingCircle size={20} />
      </div>
    );

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
