import { dayjs, db, doc, updateDoc } from "../../imports";
import { UpdateTaskStatusProps } from "../type";

export const updateTaskStatus = async ({
  id,
  status,
}: UpdateTaskStatusProps) => {
  await updateDoc(doc(db, "tasks", id), {
    status,
    updatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  });
};
