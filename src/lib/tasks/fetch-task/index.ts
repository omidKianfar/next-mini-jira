import { Task } from "@/src/types/global";
import { FetchTaskProps } from "../type";
import { db } from "@/config";
import { doc, getDoc } from "firebase/firestore";

export const fetchTask = async ({
  taskId,
}: FetchTaskProps): Promise<Task | null> => {
  const ref = doc(db, "tasks", taskId);

  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const data = snap.data();

  const task: Task = {
    id: snap.id,
    title: data.title ?? "",
    description: data.description ?? "",
    status: data.status ?? "todo",
    tag: data.tag ?? "",
    createdAt: data.createdAt ?? "",
    fileUrl: data.fileUrl ?? "",
    userId: data.userId ?? "",
  };

  return task;
};
