"use client";

import { useDispatch } from "react-redux";
import { useTaskListenerProps } from "../../type";
import { useEffect } from "react";
import { listenToTasks } from "@/src/lib/tasks/listener";

export const useTaskListener = ({ user }: useTaskListenerProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    const unsub = listenToTasks({ userId: user.userId, dispatch });

    return () => unsub();
  }, [user]);
};
