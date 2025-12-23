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

// firestore
import { updateFirestoreUser } from "@/src/lib/auth/update-user";

// redux
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";

const AdminDashboardComponent = () => {
  // hooks
  const isMobile = useIsMobile();
  const navigation = useNavigation();

  // redux
  const users = useSelector((state: RootState) => state.users);
  const usersFilters = useSelector((state: RootState) => state.usersFilters);

  // hooks
  useUsersListener();

  // functions
  const goDetail = (userId: string) => {
    navigation.adminUserDetail(userId);
  };

  const toggleActive = async (user: MyUserType) => {
    await updateFirestoreUser(user.userId as string, {
      isActive: !user.isActive,
    });
  };

  // filters
  // remove admin
  const usersWithoutAdmin = users.users.filter(
    (user) => user.userType !== UserType.Admin,
  );

  // apply filters
  const finalUsers = usersWithoutAdmin.filter((user) => {
    const created = user.createdAt;
    const { status, createdAt } = usersFilters;

    if (!created) return false;

    // status filter
    let statusBool: boolean | null = null;
    if (status === "true") statusBool = true;
    if (status === "false") statusBool = false;

    if (statusBool !== null && user.isActive !== statusBool) {
      return false;
    }

    // date filters
    if (createdAt.from && created < createdAt.from) return false;
    if (createdAt.to && created > createdAt.to) return false;

    return true;
  });

  // ui
  if (!finalUsers) return <PageLoading />;

  return (
    <div className="h-full w-full p-4">
      <div className="rounded-md bg-white p-4 shadow-md">
        <div className="mb-4 w-full text-center">
          <h2 className="mx-2 text-title font-bold text-warning-500">
            Users List
          </h2>
        </div>

        {isMobile ? (
          <UserListCard
            users={finalUsers}
            goDetail={goDetail}
            toggleActive={toggleActive}
          />
        ) : (
          <UsersTable
            users={finalUsers}
            goDetail={goDetail}
            toggleActive={toggleActive}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboardComponent;
