'use client';

import { AdminChatsListener, useDispatch, useEffect } from '../imports';

export const useChatsListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = AdminChatsListener({ dispatch });
    return () => unsub();
  }, [dispatch]);
};
