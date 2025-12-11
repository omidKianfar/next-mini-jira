"use client";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ListenToTasksProps } from "../type";
import { setTasks } from "@/src/store/slices/tasks";
import { Task } from "@/src/types/global";
import { db } from "@/config";

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
