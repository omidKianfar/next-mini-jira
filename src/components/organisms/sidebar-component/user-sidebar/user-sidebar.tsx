import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/src/hooks/auth/use-auth';
import { SidebarItems } from './sidebar-items';
import SidebarActionItem from './sidebar-action-item';
import LoadingCircle from '@/src/components/atom/loadings/loading-circle';
import ButtonFreeClass from '@/src/components/atom/buttons-component/button-free-class';
import MyIcon from '@/src/components/atom/icon-components';
import { UserType } from '@/src/types/global';
import { sidebarItemsType, sidebarProps } from './type';

const UserSidebar = ({
  user,
  setShowSidebar,
}: Pick<sidebarProps, 'setShowSidebar' | 'user'>) => {
  const { logout } = useAuth();
  const pathName = usePathname();

  const { userSidebarItems, AdminSidebarItems, LandingSidebarItems } =
    SidebarItems({
      user,
      setShowSidebar,
    });

  const HomePage =
    pathName === '/' || pathName === '/about' || pathName === '/contact';

  return (
    <div className="mt-6 flex flex-col items-start justify-center">
      <div className="h-[45vh] overflow-y-auto">
        {HomePage &&
          LandingSidebarItems?.map((item: sidebarItemsType) => (
            <div key={item?.id} className="mb-4 rounded-sm p-1">
              <Suspense
                fallback={
                  <div className="flex h-full w-full items-center justify-center">
                    <LoadingCircle size={40} />
                  </div>
                }
              >
                <SidebarActionItem item={item} />
              </Suspense>
            </div>
          ))}

        {!HomePage &&
          user?.userType === UserType?.Client &&
          userSidebarItems?.map((item: sidebarItemsType) => (
            <div key={item?.id} className="mb-4 rounded-sm">
              <Suspense
                fallback={
                  <div className="flex h-full w-full items-center justify-center">
                    <LoadingCircle size={40} />
                  </div>
                }
              >
                <SidebarActionItem item={item} />
              </Suspense>
            </div>
          ))}

        {!HomePage &&
          user?.userType === UserType?.Admin &&
          AdminSidebarItems?.map((item: sidebarItemsType) => (
            <div key={item?.id} className="mb-4 rounded-sm">
              <Suspense
                fallback={
                  <div className="flex h-full w-full items-center justify-center">
                    <LoadingCircle size={40} />
                  </div>
                }
              >
                <SidebarActionItem item={item} />
              </Suspense>
            </div>
          ))}
      </div>

      {(user?.userType === UserType.Client ||
        user?.userType === UserType.Admin) && (
        <div>
          <hr className="mt-6 w-[190px] border border-dashed border-gray-300" />

          <div className="flex w-full items-center justify-center pt-4">
            <ButtonFreeClass
              className="text-gary-700 cursor-pointer text-[16px] font-semibold hover:text-error-600"
              onClick={logout}
              icon={<MyIcon icon="logout" className="ml-1 text-title" />}
            >
              Logout
            </ButtonFreeClass>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSidebar;
