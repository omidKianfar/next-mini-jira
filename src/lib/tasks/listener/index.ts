"use client";

import { ListenToTasksProps } from "../type";

import { collection, db, onSnapshot, query, Task, where } from "../../imports";
import { setTasks } from "@/src/store/slices/tasks";

export const listenToTasks = ({ userId, dispatch }: ListenToTasksProps) => {
  const userIdInTasksQuery = query(
    collection(db, "tasks"),
    where("userId", "==", userId)
  );

  return onSnapshot(userIdInTasksQuery, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => doc.data() as Task);

    dispatch(setTasks(tasks));
  });
};
