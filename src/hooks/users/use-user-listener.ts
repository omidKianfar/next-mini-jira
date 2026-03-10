'use client';

import { useEffect, useDispatch, listenToUsers } from '../imports';

export const useUsersListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = listenToUsers({ dispatch });

    return () => unsub();
  }, [dispatch]);
};
