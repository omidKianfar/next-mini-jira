import dayjs from "dayjs";

// ui
import MyImage from "@/src/components/atom/image-components";
import MyIcon from "@/src/components/atom/icon-components";

// utiles
import { stringSlicer } from "@/src/utils/string-slicer";

// type
import { MyUserType } from "@/src/types/global";
import { UsersTableProps } from "../type";

export const Cloumns = ({
  toggleActive,
  goDetail,
}: Pick<UsersTableProps, "goDetail" | "toggleActive">) => {
  const columns = [
    {
      head: <span className="text-primary-500">Username</span>,

      column: (user: MyUserType) => (
        <div className="flex items-center justify-start">
          <div className="mr-2">
            {user.photo ? (
              <MyImage
                src={user.photo}
                fill
                wrapperClass="relative h-[40px] w-[40px] rounded-full border-2 border-primary-500 overflow-hidden"
                alt=""
              />
            ) : (
              <div className="h-[40px] w-[40px] rounded-full border-2 border-primary-500 bg-gray-200" />
            )}
          </div>

          <p className="font-semibold" title={user.userName as string}>
            {stringSlicer({ string: user.userName as string, slice: 60 })}
          </p>
        </div>
      ),
    },
    {
      head: <span className="text-primary-500">Email</span>,

      column: (user: MyUserType) => (
        <p className="font-semibold" title={user.email as string}>
          {stringSlicer({ string: user.email as string, slice: 60 })}
        </p>
      ),
    },
    {
      head: <span className="text-primary-500">Created At</span>,

      column: (user: MyUserType) => (
        <p className="font-semibold">
          {dayjs(user.createdAt).format("YYYY-MM-DD")}
        </p>
      ),
    },
    {
      head: <span className="text-primary-500">Status</span>,

      column: (user: MyUserType) => (
        <div className="flex items-center justify-start">
          <div title={user.isActive === true ? "Active" : "Deactive"}>
            {user.isActive ? (
              <MyIcon
                icon="solar:user-bold-duotone"
                iconClass="cursor-pointer text-h3 text-success-500"
                onClick={() => toggleActive(user)}
              />
            ) : (
              <MyIcon
                icon="solar:user-bold-duotone"
                iconClass="cursor-pointer text-h3 text-warning-500"
                onClick={() => toggleActive(user)}
              />
            )}
          </div>
        </div>
      ),
    },
    {
      head: "",

      column: (user: MyUserType) => (
        <div className="flex items-center justify-end">
          <MyIcon
            icon="weui:arrow-filled"
            iconClass="cursor-pointer text-h2 text-warning-500 hover:text-warning-700"
            onClick={() => goDetail(user.userId)}
          />
        </div>
      ),
    },
  ];

  return columns;
};
