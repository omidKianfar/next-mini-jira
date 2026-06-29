import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/src/providers/auth-provider';

interface DeleteTaskProps {
  taskId: string;
}
export const deleteTask = async ({ taskId }: DeleteTaskProps) => {
  const ref = doc(db, 'tasks', taskId);

  await deleteDoc(ref);
};
