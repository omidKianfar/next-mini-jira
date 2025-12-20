"use client";

import PageLoading from "@/src/components/organisms/page-loading";
import UsersTable from "./users-table";
import PaginationComponent from "@/src/components/atom/pagination";
import { useState, useEffect } from "react";
import { useUsersListener } from "@/src/hooks/users/use-user-listener";
import { UserType } from "@/src/types/global";
import MyIcon from "@/src/components/atom/icon";

const AdminDashboardComponent = () => {
  // hooks
  const { users, loading } = useUsersListener();

  // filter non-admin users
  const filteredUsers = users.filter((u) => u.userType !== UserType.Admin);

  // pagination states
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  // prevent invalid page (for example after filtering)
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [filteredUsers.length, totalPages, page]);

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  if (loading) return <PageLoading />;

  return (
    <div className="h-full min-h-screen w-full p-4">
      <div className="mb-6 mt-4 flex w-full items-center justify-center">
        <MyIcon icon="raphael:users" className="text-h3 text-primary-500" />
        <h2 className="mx-2 text-title font-bold text-warning-500">Users</h2>
        <MyIcon icon="raphael:users" className="text-h3 text-primary-500" />
      </div>

      {/* Correct: Only paginated users go to table */}
      <UsersTable users={paginatedUsers} />

      <PaginationComponent
        currentPage={page}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1); // reset to first page on size change
        }}
      />
    </div>
  );
};

export default AdminDashboardComponent;
