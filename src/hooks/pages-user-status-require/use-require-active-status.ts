'use client';

import { usePathname, useEffect, UserType } from '../imports';
import { useAuth } from '../auth/use-auth';
import { useNavigation } from '../navigation/use-navigation';

export const useRequireActiveStatus = () => {
  const pathname = usePathname();
  const navigation = useNavigation();
  const auth = useAuth();

  const user = auth?.user;
  const isLoading = auth?.isLoading;

  useEffect(() => {
    if (!user) return;
    if (isLoading) return;

    if (pathname.includes('/signup')) return;

    if (user?.userType == UserType?.Admin) return;

    if (!user?.isActive) {
      navigation.activePage();
      return;
    }
  }, [isLoading, user, navigation]);
};
