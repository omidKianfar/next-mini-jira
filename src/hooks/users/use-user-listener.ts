'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { listenToUsers } from '@/src/libs/auth/listener';

export const useUsersListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = listenToUsers({ dispatch });

    return () => unsub();
  }, [dispatch]);
};
