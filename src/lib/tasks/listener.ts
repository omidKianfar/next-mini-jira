"use client";

import { collection, onSnapshot, query, where } from "firebase/firestore";

// type
import { ListenToTasksProps } from "./type";
import { Task } from "@/src/types/global";

// redux
import { setTasks } from "@/src/store/slices/tasks/tasks";

// config
import { db } from "@/config/firebase";

export const listenToTasks = ({ userId, dispatch }: ListenToTasksProps) => {
  const userIdInTasksQuery = query(
    collection(db, "tasks"),
    where("userId", "==", userId),
  );

  return onSnapshot(userIdInTasksQuery, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => doc.data() as Task);

    dispatch(setTasks(tasks));
  });
};
