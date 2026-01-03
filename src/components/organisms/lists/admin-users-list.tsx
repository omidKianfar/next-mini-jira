"use client";

// ui
import ListComponent from "@/src/components/organisms/list-component";
import MyIcon from "@/src/components/atom/icon-components";

// utils
import { stringSlicer } from "@/src/utils/string-slicer";

// hooks
import { useInfiniteUsers } from "@/src/hooks/users/use-infinity-users";

// type
import { UsersTableProps } from "../type";

const UserListCard = ({ users, goDetail, toggleActive }: UsersTableProps) => {
  // hooks
  const { visibleUsers, loaderRef, hasMore } = useInfiniteUsers(users, 10);

  return (
    <ListComponent>
      {visibleUsers.map((user) => (
        <div
          key={user.userId}
          className="w-full cursor-pointer rounded-lg border-2 border-warning-500 bg-gray-50 p-2 shadow-md hover:bg-gray-100"
          onClick={() => goDetail(user?.userId)}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              {stringSlicer({ string: user.userName as string, slice: 40 })}
            </h3>

            <div onClick={(e) => e.stopPropagation()}>
              {user.isActive ? (
                <MyIcon
                  icon="solar:user-bold-duotone"
                  iconClass="cursor-pointer text-title text-success-500"
                  onClick={() => toggleActive(user)}
                />
              ) : (
                <MyIcon
                  icon="solar:user-bold-duotone"
                  iconClass="cursor-pointer text-title text-warning-500"
                  onClick={() => toggleActive(user)}
                />
              )}
            </div>
          </div>

          <p className="mt-2 my-1 text-label text-gray-600">
            {stringSlicer({ string: user.email as string, slice: 40 })}
          </p>
        </div>
      ))}

      {hasMore && (
        <p ref={loaderRef} className="py-4 text-center text-body text-gray-500">
          Loading more...
        </p>
      )}

      {!hasMore && (
        <p className="py-4 text-center text-body text-gray-400">
          No more users
        </p>
      )}
    </ListComponent>
  );
};

export default UserListCard;
