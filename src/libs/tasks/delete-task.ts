import { deleteDoc, doc } from "firebase/firestore";

// configs
import { db } from "@/configs/firebase";

// type
import { DeleteTaskProps } from "./type";

export const deleteTask = async ({ taskId }: DeleteTaskProps) => {
  const ref = doc(db, "tasks", taskId);

  await deleteDoc(ref);
};
