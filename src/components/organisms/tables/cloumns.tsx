import dayjs from 'dayjs';
import MyImage from '../../atom/image-components';
import { stringSlicer } from '@/src/utils/string-slicer';
import MyIcon from '../../atom/icon-components';
import { MyUserType } from '@/src/types/global';
import { UsersTableProps } from './type';

export const Cloumns = ({
  toggleActive,
  goDetail,
}: Pick<UsersTableProps, 'goDetail' | 'toggleActive'>) => {
  const columns = [
    {
      head: <span className="text-gray-700">Username</span>,

      column: (user: MyUserType) => (
        <div className="flex items-center justify-start">
          <div className="mr-2">
            {user.photo ? (
              <MyImage
                src={user.photo}
                fill
                wrapperClass="relative h-[40px] w-[40px] rounded-full border-2 border-gray-300 overflow-hidden"
                alt=""
              />
            ) : (
              <div className="h-[40px] w-[40px] rounded-full border-2 border-gray-300 bg-gray-200" />
            )}
          </div>

          <p
            className="font-semibold text-gray-600"
            title={user.userName as string}
          >
            {stringSlicer({ string: user.userName as string, slice: 25 })}
          </p>
        </div>
      ),
    },
    {
      head: <span className="text-gray-700">Email</span>,

      column: (user: MyUserType) => (
        <p className="font-semibold text-gray-600" title={user.email as string}>
          {stringSlicer({ string: user.email as string, slice: 25 })}
        </p>
      ),
    },
    {
      head: <span className="text-gray-700">Created At</span>,

      column: (user: MyUserType) => (
        <p className="font-semibold text-gray-600">
          {dayjs(user.createdAt).format('YYYY-MM-DD')}
        </p>
      ),
    },
    {
      head: <span className="text-gray-700">Status</span>,

      column: (user: MyUserType) => (
        <div className="flex items-center justify-start">
          <div title={user.isActive === true ? 'Active' : 'Deactive'}>
            <MyIcon
              icon="user"
              iconClass={`cursor-pointer text-h3 ${user.isActive ? 'text-success-500' : 'text-warning-500'}`}
              onClick={() => toggleActive(user)}
            />
          </div>
        </div>
      ),
    },
    {
      head: '',

      column: (user: MyUserType) => (
        <div className="flex items-center justify-end">
          <MyIcon
            icon="arrow-enter"
            iconClass="cursor-pointer text-h2 text-warning-400 hover:text-warning-500"
            onClick={() => goDetail(user.userId)}
          />
        </div>
      ),
    },
  ];

  return columns;
};
