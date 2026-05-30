'use client';

import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { AppDispatch } from '@/src/store';
import { setTasks } from '@/src/store/slices/tasks/tasks';
import { db } from '@/configs/firebase';
import { Task } from '@/src/types/global';

interface ListenToTasksProps {
  userId: string;
  dispatch: AppDispatch;
}

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
