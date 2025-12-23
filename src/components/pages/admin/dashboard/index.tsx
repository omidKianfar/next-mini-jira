"use client";

// hooks
import { useUsersListener } from "@/src/hooks/users/use-user-listener";
import { useIsMobile } from "@/src/hooks/mobile-size";
import { useNavigation } from "@/src/hooks/navigation";

// ui
import PageLoading from "@/src/components/organisms/page-loading";
import UsersTable from "./users-table";
import UserListCard from "./user-list-card";

// type
import { MyUserType, UserType } from "@/src/types/global";
import { updateFirestoreUser } from "@/src/lib/auth/update-user";

const AdminDashboardComponent = () => {
  // hooks
  const isMobile = useIsMobile();
  const navigation = useNavigation();
  const { users, loading } = useUsersListener();

  const goDetail = (userId: string) => {
    navigation.adminUserDetail(userId);
  };

  const toggleActive = async (user: MyUserType) => {
    await updateFirestoreUser(user.userId as string, {
      isActive: !user.isActive,
    });
  };

  // filter
  const filteredUsers = users.filter((u) => u.userType !== UserType.Admin);

  if (loading) return <PageLoading />;

  return (
    <div className="h-full w-full p-4">
      <div className="rounded-md bg-white p-2 pt-4 shadow-md">
        <div className="mb-4 flex w-full items-center justify-start">
          <h2 className="mx-2 text-title font-bold text-warning-500">Users</h2>
        </div>

        {isMobile ? (
          <UserListCard
            users={filteredUsers}
            goDetail={goDetail}
            toggleActive={toggleActive}
          />
        ) : (
          <UsersTable
            users={filteredUsers}
            goDetail={goDetail}
            toggleActive={toggleActive}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboardComponent;
