import { Suspense, useState } from 'react';
import LoadingCircle from '../../atom/loadings/loading-circle';
import PageLoading from '../../common/page-loading';
import { TableComponent } from '../table-component';
import PaginationComponent from '../pagination-component';
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
      <Suspense fallback={<PageLoading />}>
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
      </Suspense>
    </div>
  );
};

export default UsersTable;
