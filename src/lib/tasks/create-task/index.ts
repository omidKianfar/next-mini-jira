import { db } from "@/config";
import { Task } from "@/src/types/global";
import { doc, setDoc } from "firebase/firestore";

export const createTaskDocument = async (newTask: Task) => {
  await setDoc(doc(db, "tasks", newTask?.id), newTask);
};
