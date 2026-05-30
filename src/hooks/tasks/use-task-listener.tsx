'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { listenToTasks } from '@/src/libs/tasks/listener';
import { MyUserType } from '@/src/types/global';

interface useTaskListenerProps {
  user: MyUserType | null;
}

export const useTaskListener = ({ user }: useTaskListenerProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    const unsub = listenToTasks({ userId: user.userId, dispatch });

    return () => unsub();
  }, [user]);
};
