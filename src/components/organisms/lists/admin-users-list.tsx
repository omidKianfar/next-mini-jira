'use client';

import {
  ListComponent,
  LoadingCircle,
  MyIcon,
  stringSlicer,
  useInfiniteUsers,
} from '../imports';
import { UsersTableProps } from '../type';

const UserListCard = ({ users, goDetail, toggleActive }: UsersTableProps) => {
  const { visibleUsers, loaderRef, hasMore } = useInfiniteUsers(users, 10);

  if (!users)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingCircle size={20} />
      </div>
    );

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
              <MyIcon
                icon="user"
                iconClass={`cursor-pointer text-title ${user.isActive ? 'text-success-500' : 'text-warning-500'}`}
                onClick={() => toggleActive(user)}
              />
            </div>
          </div>

          <p className="my-1 mt-2 text-label text-gray-600">
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
