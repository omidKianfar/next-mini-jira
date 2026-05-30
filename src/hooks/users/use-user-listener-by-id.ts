import { useEffect, useState } from 'react';
import { listenToUserById } from '@/src/libs/auth/find-user-by-userId';
import { MyUserType } from '@/src/types/global';

export const useUserListenerById = (userId: string | null) => {
  const [user, setUser] = useState<MyUserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = listenToUserById(userId, (snapshotUser) => {
      setUser(snapshotUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  return { user, loading };
};
