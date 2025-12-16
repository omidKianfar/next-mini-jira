import { doc, updateDoc } from "firebase/firestore";
import { UpdateTaskStatusProps } from "../type";
import { db } from "@/config/firebase";
import dayjs from "dayjs";

export const updateTaskStatus = async ({
  id,
  status,
}: UpdateTaskStatusProps) => {
  await updateDoc(doc(db, "tasks", id), {
    status,
    updatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  });
};
