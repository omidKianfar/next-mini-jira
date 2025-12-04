import { db, deleteDoc, doc } from "../../imports";
import { DeleteTaskProps } from "../../tasks/type";

export const deleteTask = async ({ taskId }: DeleteTaskProps) => {
  const ref = doc(db, "tasks", taskId);

  await deleteDoc(ref);
};
