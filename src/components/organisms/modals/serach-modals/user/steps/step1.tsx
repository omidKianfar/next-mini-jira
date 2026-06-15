import EmptyColumn from '@/src/components/atom/empty-components/empty-column';
import MyIcon from '@/src/components/atom/icon-components';
import { useAuth } from '@/src/hooks/auth/use-auth';
import { useNavigation } from '@/src/hooks/navigation/use-navigation';
import { RootState } from '@/src/store';
import { MyUserType, UserType } from '@/src/types/global';
import { stringSlicer } from '@/src/utils/string-slicer';
import { enqueueSnackbar } from 'notistack';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';

interface Step1Props {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
  filteredUsers: MyUserType[];
  setFilteredUsers: Dispatch<SetStateAction<MyUserType[]>>;
  setUser: Dispatch<SetStateAction<MyUserType | null>>;
  setStep: Dispatch<SetStateAction<number>>;
  handleClose: () => void;
}
const Step1 = ({
  searchValue,
  setSearchValue,
  openMenu,
  setOpenMenu,
  filteredUsers,
  setFilteredUsers,
  setUser,
  setStep,
  handleClose,
}: Step1Props) => {
  const navigation = useNavigation();
  const { user: currentUser } = useAuth();

  const users = useSelector((state: RootState) => state?.users?.users);

  const goDetail = (userId: string) => {
    navigation.adminUserDetail(userId);

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

    const usersWithoutAdmin = users.filter(
      (user) => user.userType !== UserType.Admin
    );

    const filtered = usersWithoutAdmin.filter((user) => {
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

  const goActiveStep = (user: MyUserType) => {
    if (currentUser?.isGuest) {
      enqueueSnackbar(`You can't do it. you are a guest admin`, {
        variant: 'warning',
      });
    } else {
      setUser(user);
      setStep(2);
    }
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

      <div>
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
                        onClick={() => goActiveStep(user)}
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
    </div>
  );
};

export default Step1;
