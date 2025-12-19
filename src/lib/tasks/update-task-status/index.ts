import { doc, updateDoc } from "firebase/firestore";
import dayjs from "dayjs";

// type
import { UpdateTaskStatusProps } from "../type";

// config
import { db } from "@/config/firebase";

export const updateTaskStatus = async ({
  id,
  status,
}: UpdateTaskStatusProps) => {
  await updateDoc(doc(db, "tasks", id), {
    status,
    updatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  });
};
