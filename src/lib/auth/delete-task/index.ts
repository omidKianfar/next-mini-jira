import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";

// type
import { DeleteTaskProps } from "../../tasks/type";

export const deleteTask = async ({ taskId }: DeleteTaskProps) => {
  const ref = doc(db, "tasks", taskId);

  await deleteDoc(ref);
};
