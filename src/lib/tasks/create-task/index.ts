import { db, doc, setDoc, Task } from "../../imports";

export const createTaskDocument = async (newTask: Task) => {
  await setDoc(doc(db, "tasks", newTask?.id), newTask);
};
