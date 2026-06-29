import dayjs from 'dayjs';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/src/providers/auth-provider';

interface UpdateTaskStatusProps {
  id: string;
  status: string;
}
export const updateTaskStatus = async ({
  id,
  status,
}: UpdateTaskStatusProps) => {
  await updateDoc(doc(db, 'tasks', id), {
    status,
    updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  });
};
