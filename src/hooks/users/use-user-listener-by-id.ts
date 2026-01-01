import { useEffect, useState } from "react";

// type
import { MyUserType } from "@/src/types/global";

// firestore
import { listenToUserById } from "@/src/libs/auth/find-user-by-userId";

export const useUserListenerById = (userId: string | null) => {
  // states
  const [user, setUser] = useState<MyUserType | null>(null);
  const [loading, setLoading] = useState(true);

  // functions
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
