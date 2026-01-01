"use client";

import { useDispatch } from "react-redux";
import { useEffect } from "react";

// type
import { useTaskListenerProps } from "../type";

//hook
import { listenToTasks } from "@/src/libs/tasks/listener";

export const useTaskListener = ({ user }: useTaskListenerProps) => {
  // hooks
  const dispatch = useDispatch();

  // functions
  useEffect(() => {
    if (!user) return;

    const unsub = listenToTasks({ userId: user.userId, dispatch });

    return () => unsub();
  }, [user]);
};
