import { deleteDoc, doc } from "firebase/firestore";
import { DeleteTaskProps } from "../../tasks/type";
import { db } from "@/config";

export const deleteTask = async ({ taskId }: DeleteTaskProps) => {
  const ref = doc(db, "tasks", taskId);

  await deleteDoc(ref);
};
