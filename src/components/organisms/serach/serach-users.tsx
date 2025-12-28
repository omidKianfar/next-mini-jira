"use client";

import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";

// hooks
import { useNavigation } from "@/src/hooks/navigation";

// type
import { ModalProps } from "../../molecule/type";
import { MyUserType } from "@/src/types/global";

// redux
import { RootState } from "@/src/store";

// ui
import MyIcon from "../../atom/icon";
import EmptyColumn from "../board/empty-column";

// utiles
import { stringSlicer } from "@/src/utils/string-slicer";
import MyImage from "../../atom/image";

const SearchUsers = ({ handleClose }: Pick<ModalProps, "handleClose">) => {
  // hooks
  const navigation = useNavigation();

  // redux
  const users = useSelector((state: RootState) => state.users.users);

  // states
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<MyUserType[]>([]);

  // functions
  const serachHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as string;

    setSearchValue(value);

    if (!value.trim()) {
      setFilteredUsers([]);
      setOpenMenu(false);
      return;
    }

    const query = value.toLowerCase();

    const filtered = users.filter((user) => {
      const username = user?.userName.toLowerCase() || "";
      const email = user?.email.toLowerCase() || "";
      return username.includes(query) || email.includes(query);
    });

    setFilteredUsers(filtered);
    setOpenMenu(true);
  };

  const handelClear = () => {
    setSearchValue("");
    setFilteredUsers([]);
    setOpenMenu(false);
  };

  return (
    <div className="w-full">
      <h1 className="mb-4 text-center text-subtitle font-bold text-warning-500">
        Search Users
      </h1>

      <div className="relative mb-4 rounded-lg border-2 border-warning-400 bg-gray-50 p-2 shadow-md">
        <div>
          <MyIcon
            icon="tabler:zoom"
            className="absolute left-3 top-5 text-title text-primary-500"
          />

          {filteredUsers.length > 0 && (
            <MyIcon
              icon="material-symbols:close-rounded"
              className="absolute right-3 top-5 cursor-pointer text-title text-gray-400 hover:text-error-500"
              onClick={handelClear}
            />
          )}

          <input
            className="my-1 w-full rounded-lg border-2 border-primary-400 px-8 py-2 text-bodySm shadow-md focus:outline-primary-700"
            value={searchValue}
            onChange={(event) => serachHandler(event)}
          />
        </div>
      </div>

      {openMenu ? (
        filteredUsers.length > 0 ? (
          <div className="scrollbar-hide mt-4 max-h-80 overflow-y-auto">
            {filteredUsers.map((user) => (
              <div
                key={user.userId}
                className="mb-4 flex w-full cursor-pointer items-center justify-start rounded-lg border-2 border-warning-400 bg-gray-50 p-4 shadow-md"
                onClick={() => {
                  navigation.adminUserDetail(user.userId);
                  handleClose();
                }}
              >
                <div className="mr-4 overflow-hidden">
                  {user?.photo ? (
                    <MyImage
                      src={user.photo as string}
                      alt=""
                      fill
                      className="rounded-full object-cover"
                      wrapperClass="relative h-[40px] w-[40px] rounded-full border-2 border-primary-500 "
                    />
                  ) : (
                    <div className="h-[40px] w-[40px] rounded-full border-2 border-primary-500 bg-gray-200"></div>
                  )}
                </div>

                <div>
                  <h3 className="text-body font-semibold mb-1">
                    {stringSlicer({
                      string: user.userName as string,
                      slice: 40,
                    })}
                  </h3>

                  <p className="text-label text-gray-600">
                    {stringSlicer({
                      string: user.email as string,
                      slice: 40,
                    })}
                  </p>
                </div>
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
