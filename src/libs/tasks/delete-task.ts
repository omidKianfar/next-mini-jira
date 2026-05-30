import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/configs/firebase';

interface DeleteTaskProps {
  taskId: string;
}
export const deleteTask = async ({ taskId }: DeleteTaskProps) => {
  const ref = doc(db, 'tasks', taskId);

  await deleteDoc(ref);
};
