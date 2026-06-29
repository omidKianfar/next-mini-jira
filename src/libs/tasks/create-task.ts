import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/src/providers/auth-provider';
import { Task } from '@/src/types/global';

export const createTaskDocument = async (newTask: Task) => {
  await setDoc(doc(db, 'tasks', newTask?.id), newTask);
};
