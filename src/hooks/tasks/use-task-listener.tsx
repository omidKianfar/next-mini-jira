'use client';

import { useDispatch, useEffect, listenToTasks } from '../imports';
import { useTaskListenerProps } from '../type';

export const useTaskListener = ({ user }: useTaskListenerProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    const unsub = listenToTasks({ userId: user.userId, dispatch });

    return () => unsub();
  }, [user]);
};
