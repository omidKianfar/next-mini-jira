import { ButtonFreeClass, MyIcon, useAuth, UserType } from '../../imports';
import { sidebarItemsType, sidebarProps } from '../../type';
import { SidebarItems } from './sidebar-items';
import SidebarActionItem from './sidebar-action-item';

const UserSidebar = ({
  user,
  setShowSidebar,
}: Pick<sidebarProps, 'setShowSidebar' | 'user'>) => {
  const { logout } = useAuth();

  const { userSidebarItems, AdminSidebarItems } = SidebarItems({
    user,
    setShowSidebar,
  });

  return (
    <div className="mt-6 flex flex-col items-start justify-center">
      <div className="h-[45vh] overflow-y-auto">
        {user?.userType === UserType?.Client
          ? userSidebarItems?.map((item: sidebarItemsType) => (
              <div key={item.id} className="mb-4">
                <SidebarActionItem item={item} />
              </div>
            ))
          : AdminSidebarItems?.map((item: sidebarItemsType) => (
              <div key={item.id} className="mb-4">
                <SidebarActionItem item={item} />
              </div>
            ))}
      </div>

      <hr className="mt-6 w-[190px] border border-dashed border-gray-300" />

      <div className="flex w-full items-center justify-center pt-4">
        <ButtonFreeClass
          className="cursor-pointer text-[16px] font-semibold text-primary-700 hover:text-warning-600"
          onClick={logout}
          icon={<MyIcon icon="logout" className="ml-1 text-title" />}
        >
          Logout
        </ButtonFreeClass>
      </div>
    </div>
  );
};

export default UserSidebar;
