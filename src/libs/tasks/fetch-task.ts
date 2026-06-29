import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/src/providers/auth-provider';
import { Task } from '@/src/types/global';

interface FetchTaskProps {
  taskId: string;
}
export const fetchTask = async ({
  taskId,
}: FetchTaskProps): Promise<Task | null> => {
  const ref = doc(db, 'tasks', taskId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const data = snap.data();

  const task: Task = {
    id: snap.id,
    title: data.title ?? '',
    description: data.description ?? '',
    status: data.status ?? 'todo',
    tag: data.tag ?? '',
    createdAt: data.createdAt ?? '',
    attachment: {
      fileUrl: data?.fileUrl ?? '',
      fileType: data?.fileType ?? '',
    },
    userId: data.userId ?? '',
  };

  return task;
};
