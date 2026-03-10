import { useEffect, useState, MyUserType, listenToUserById } from '../imports';

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
