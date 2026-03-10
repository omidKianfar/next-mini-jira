'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { useUsersListener } from '@/src/hooks/users/use-user-listener';
import { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';
import { useNavigation } from '@/src/hooks/navigation/use-navigation';

import PageLoading from '@/src/components/common/page-loading';
import UsersTable from '../../../organisms/tables/admin-users-table';
import UserListCard from '../../../organisms/lists/admin-users-list';
import MyIcon from '@/src/components/atom/icon-components';

import { MyUserType, UserType } from '@/src/types/global';

import { updateFirestoreUser } from '@/src/libs/auth/update-user';

import { RootState } from '@/src/store';
import { toggleSortByCreatedAt } from '@/src/store/slices/users/users';

const AdminDashboardComponent = () => {
  const isMobile = useIsMobile();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.users.users);
  const usersFilters = useSelector((state: RootState) => state.usersFilters);

  useUsersListener();

  const [sort, setSort] = useState<boolean>(false);

  const goDetail = (userId: string) => {
    navigation.adminUserDetail(userId);
  };

  const toggleActive = async (user: MyUserType) => {
    await updateFirestoreUser(user.userId as string, {
      isActive: !user.isActive,
    });
  };

  const usersWithoutAdmin = users.filter(
    (user) => user.userType !== UserType.Admin
  );

  const finalUsers = usersWithoutAdmin.filter((user) => {
    const created = user.createdAt;
    const { status, createdAt } = usersFilters;

    if (!created) return false;

    let statusBool: boolean | null = null;
    if (status === 'true') statusBool = true;
    if (status === 'false') statusBool = false;

    if (statusBool !== null && user.isActive !== statusBool) {
      return false;
    }

    if (createdAt.from && created < createdAt.from) return false;
    if (createdAt.to && created > createdAt.to) return false;

    return true;
  });

  const SortHandler = () => {
    setSort(!sort);

    dispatch(toggleSortByCreatedAt());
  };

  if (!finalUsers) return <PageLoading />;

  return (
    <div className="h-full w-full p-4">
      <div className="rounded-md bg-white p-4 shadow-md">
        <div className="mb-4 flex w-full items-center justify-between">
          <h2 className="mx-2 text-title font-bold text-warning-500">
            Users List
          </h2>

          {sort ? (
            <MyIcon
              icon="ASC"
              className="cursor-pointer text-h4 text-blue-400"
              onClick={SortHandler}
            />
          ) : (
            <MyIcon
              icon="DSCE"
              className="cursor-pointer text-h4 text-blue-400"
              onClick={SortHandler}
            />
          )}
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
