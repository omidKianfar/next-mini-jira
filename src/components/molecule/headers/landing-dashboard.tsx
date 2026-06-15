'use client';

import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/src/hooks/auth/use-auth';
import { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';
import { useNavigation } from '@/src/hooks/navigation/use-navigation';
import { stringSlicer } from '@/src/utils/string-slicer';
import MyIcon from '@/src/components/atom/icon-components';
import MyImage from '@/src/components/atom/image-components';
import ButtonFreeClass from '@/src/components/atom/buttons-component/button-free-class';
import { UserType } from '@/src/types/global';

const LandingDashboard = () => {
  const isMobile = useIsMobile();
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const goToDashboard = () => {
    user?.userType === UserType.Admin
      ? navigation.adminDashboard()
      : navigation.dashboard();

    setShowMenu(false);
  };

  const goToProfile = () => {
    user?.userType === UserType.Admin
      ? navigation.adminProfile()
      : navigation.profile();

    setShowMenu(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showMenu &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

  if (isMobile || !user) return null;

  return (
    <div className="relative flex w-full items-center justify-end gap-3">
      <div className="relative h-[40px] w-[40px] overflow-hidden rounded-full border-2 border-gray-300 bg-gray-200">
        {user.photo ? (
          <MyImage
            src={user.photo}
            alt={user.userName || 'User'}
            fill
            className="object-cover"
          />
        ) : null}
      </div>

      <p className="text-label text-gray-700">
        {stringSlicer({ string: user.userName || '', slice: 10 })}
      </p>

      <div ref={dropdownRef} className="relative">
        <ButtonFreeClass
          className="flex items-center text-h4 transition-colors hover:text-warning-600"
          onClick={() => setShowMenu(!showMenu)}
          icon={<MyIcon icon="dotted-menu" />}
        />

        {showMenu && (
          <div className="absolute right-0 top-full z-50 mt-2 w-[140px] flex-col items-start rounded-md border border-gray-100 bg-white p-1 shadow-xl">
            <button
              onClick={goToDashboard}
              className="w-full rounded px-3 py-2 text-left text-bodySm text-gray-700 transition-colors hover:bg-gray-50 hover:text-warning-500"
            >
              Dashboard
            </button>

            <button
              onClick={goToProfile}
              className="w-full rounded px-3 py-2 text-left text-bodySm text-gray-700 transition-colors hover:bg-gray-50 hover:text-warning-500"
            >
              Profile
            </button>

            <div className="my-1 border-t border-gray-200" />

            <button
              onClick={logout}
              className="flex w-full items-center justify-between rounded px-3 py-2 text-bodySm text-gray-700 transition-colors hover:bg-gray-50 hover:text-error-500"
            >
              Logout <MyIcon icon="logout" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingDashboard;
