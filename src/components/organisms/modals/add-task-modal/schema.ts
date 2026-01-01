import * as Yup from "yup";

// type
import { TaskForm } from "@/src/types/global";

export const TaskShema = Yup.object({
  title: Yup.string().required("Enter your title"),
  description: Yup.string().required("Enter your description"),
  tag: Yup.string().required("Enter your status"),
  fileUrl: Yup.string()
    .transform((value, option) => (option === undefined ? undefined : value))
    .notRequired(),
}) as unknown as Yup.ObjectSchema<TaskForm>;
