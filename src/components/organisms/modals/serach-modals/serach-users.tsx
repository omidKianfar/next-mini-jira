'use client';

import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@/src/hooks/navigation/use-navigation';
import { RootState } from '@/src/store';
import { ModalProps, MyUserType } from '@/src/types/global';
import EmptyColumn from '@/src/components/atom/empty-components/empty-column';
import MyIcon from '@/src/components/atom/icon-components';
import UserListCard from '../../lists/admin-users-list';
import { updateFirestoreUser } from '@/src/libs/auth/update-user';
import { stringSlicer } from '@/src/utils/string-slicer';

const SearchUsers = ({ handleClose }: Pick<ModalProps, 'handleClose'>) => {
  const navigation = useNavigation();

  const users = useSelector((state: RootState) => state?.users?.users);

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<MyUserType[]>([]);

  const goDetail = (userId: string) => {
    navigation.adminUserDetail(userId);

    handleClose?.();
  };

  const toggleActive = async (user: MyUserType) => {
    await updateFirestoreUser(user.userId as string, {
      isActive: !user.isActive,
    });

    handleClose?.();
  };

  const serachHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as string;

    setSearchValue(value);

    if (!value.trim()) {
      setFilteredUsers([]);
      setOpenMenu(false);
      return;
    }

    const query = value?.toLowerCase();

    const filtered = users.filter((user) => {
      const username = user?.userName?.toLowerCase() || '';
      const email = user?.email?.toLowerCase() || '';
      return username?.includes(query) || email?.includes(query);
    });

    setFilteredUsers(filtered);
    setOpenMenu(true);
  };

  const handelClear = () => {
    setSearchValue('');
    setFilteredUsers([]);
    setOpenMenu(false);
  };

  return (
    <div className="w-full">
      <h1 className="mb-4 text-subtitle font-bold text-primary-500">
        Search Users
      </h1>

      <div className="relative mb-4">
        <div>
          <MyIcon
            icon="search"
            className="absolute left-2 top-[15px] text-subtitle text-gray-300"
          />

          {filteredUsers.length > 0 && (
            <MyIcon
              icon="close"
              className="absolute right-2 top-[14px] cursor-pointer text-subtitle text-gray-400 hover:text-error-500"
              onClick={handelClear}
            />
          )}

          <input
            className="my-1 w-full rounded-md border-2 border-primary-500 px-8 py-2 text-bodySm text-gray-600 focus:outline-primary-700"
            value={searchValue}
            onChange={(event) => serachHandler(event)}
            autoFocus
          />
        </div>
      </div>

      {openMenu ? (
        filteredUsers.length > 0 ? (
          <div className="scrollbar-hide mt-4 max-h-80 overflow-y-auto">
            {filteredUsers.map((user) => (
              <div
                key={user.userId}
                className="mb-4 w-full cursor-pointer rounded-lg border-2 border-gray-300 p-2 shadow-sm last:mb-2 hover:bg-gray-100"
                onClick={() => goDetail(user?.userId)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-600">
                    {stringSlicer({
                      string: user.userName as string,
                      slice: 40,
                    })}
                  </h3>

                  <div onClick={(e) => e.stopPropagation()}>
                    <MyIcon
                      icon="user"
                      iconClass={`cursor-pointer text-title ${user.isActive ? 'text-success-500' : 'text-warning-500'}`}
                      onClick={() => toggleActive(user)}
                    />
                  </div>
                </div>

                <p className="my-1 mt-2 text-label text-gray-400">
                  {stringSlicer({
                    string: user.email as string,
                    slice: 40,
                  })}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-2">
            <EmptyColumn />
          </div>
        )
      ) : null}
    </div>
  );
};

export default SearchUsers;
