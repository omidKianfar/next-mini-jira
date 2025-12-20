"use client";

import { useDispatch } from "react-redux";
import { useEffect } from "react";

// type
import { useTaskListenerProps } from "../type";

//hook
import { listenToTasks } from "@/src/lib/tasks/listener";

export const useTaskListener = ({ user }: useTaskListenerProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    const unsub = listenToTasks({ userId: user.userId, dispatch });

    return () => unsub();
  }, [user]);
};
