import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/src/hooks/auth/use-auth';
import { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';
import { useNavigation } from '@/src/hooks/navigation/use-navigation';
import { stringSlicer } from '@/src/utils/string-slicer';
import MyIcon from '@/src/components/atom/icon-components';
import MyImage from '@/src/components/atom/image-components';
import Link from 'next/link';
import ButtonFreeClass from '@/src/components/atom/buttons-component/button-free-class';

const LandingDashboard = () => {
  const isMobile = useIsMobile();
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const [showMenu, setShowMenu] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showMenu &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowMenu?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu, setShowMenu]);

  return (
    <div className="relative">
      {!isMobile && user && (
        <div className="flex w-full items-center justify-end gap-2">
          <div className="flex items-center justify-center overflow-hidden">
            {user?.photo ? (
              <MyImage
                src={user?.photo as string}
                alt=""
                fill
                className="rounded-full object-cover"
                wrapperClass="relative h-[40px] w-[40px] rounded-full border-2 border-primary-500 "
              />
            ) : (
              <div className="h-[40px] w-[40px] rounded-full border-2 border-primary-500 bg-gray-200"></div>
            )}
          </div>

          <p className="font-semibold">
            {stringSlicer({ string: user?.userName as string, slice: 15 })}
          </p>

          <div ref={dropdownRef}>
            <ButtonFreeClass
              className="cursor-pointer text-h4 hover:text-warning-600"
              onClick={() => setShowMenu(!showMenu)}
              icon={<MyIcon icon="dotted-menu" />}
            ></ButtonFreeClass>

            {showMenu && (
              <div className="absolute right-0 top-full flex w-[120px] flex-col items-start justify-start gap-1 rounded-md bg-white p-2 shadow-lg">
                <div
                  onClick={() => navigation.dashboard()}
                  className="w-full cursor-pointer rounded-sm px-2 py-1 text-bodySm hover:bg-gray-100 hover:text-warning-600"
                >
                  Dashboard
                </div>

                <div
                  onClick={() => navigation.profile()}
                  className="w-full cursor-pointer rounded-sm px-2 py-1 text-bodySm hover:bg-gray-100 hover:text-warning-600"
                >
                  Profile
                </div>

                <div
                  onClick={logout}
                  className="flex w-full cursor-pointer items-center justify-start rounded-sm px-2 py-1 text-bodySm hover:bg-gray-100 hover:text-warning-600"
                >
                  Logout {<MyIcon icon="logout" className="ml-1" />}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingDashboard;
