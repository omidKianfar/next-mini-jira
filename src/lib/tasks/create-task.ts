import { db } from "@/config/firebase";
import { doc, setDoc } from "firebase/firestore";

// type
import { Task } from "@/src/types/global";

export const createTaskDocument = async (newTask: Task) => {
  await setDoc(doc(db, "tasks", newTask?.id), newTask);
};
