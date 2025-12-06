"use client";

import { listenToTasks, useDispatch, useEffect } from "../../imports";
import { useTaskListenerProps } from "../../type";

export const useTaskListener = ({ user }: useTaskListenerProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    const unsub = listenToTasks({ userId: user.userId, dispatch });

    return () => unsub();
  }, [user]);
};
