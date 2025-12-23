"use client";

// ui
import ListComponent from "@/src/components/atom/lits";
import MyIcon from "@/src/components/atom/icon";

// utiles
import { stringSlicer } from "@/src/utils/string-slicer";

// hooks
import { useInfiniteUsers } from "@/src/hooks/users/useInfinityUsers";

// type
import { UsersTableProps } from "../../type";

const UserListCard = ({ users, goDetail, toggleActive }: UsersTableProps) => {
  const { visibleUsers, loaderRef, hasMore } = useInfiniteUsers(users, 10);

  return (
    <ListComponent>
      {visibleUsers.map((user) => (
        <div
          key={user.userId}
          className="w-full cursor-pointer rounded-lg border bg-gray-50 p-2 shadow-sm hover:bg-gray-100"
          onClick={() => goDetail(user?.userId)}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              {stringSlicer({ string: user.userName as string, slice: 40 })}
            </h3>

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

          <div className="mt-2 space-y-1 text-sm text-gray-600">
            <p>
              Email: {stringSlicer({ string: user.email as string, slice: 40 })}
            </p>
          </div>
        </div>
      ))}

      {hasMore && (
        <div ref={loaderRef} className="py-4 text-center text-sm text-gray-500">
          Loading more...
        </div>
      )}

      {!hasMore && (
        <div className="py-4 text-center text-sm text-gray-400">
          No more users
        </div>
      )}
    </ListComponent>
  );
};

export default UserListCard;
