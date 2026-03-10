'use client';

import {
  collection,
  db,
  onSnapshot,
  query,
  setTasks,
  Task,
  where,
} from '../imports';
import { ListenToTasksProps } from '../type';

export const listenToTasks = ({ userId, dispatch }: ListenToTasksProps) => {
  const userIdInTasksQuery = query(
    collection(db, 'tasks'),
    where('userId', '==', userId)
  );

  return onSnapshot(userIdInTasksQuery, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => doc.data() as Task);

    dispatch(setTasks(tasks));
  });
};
