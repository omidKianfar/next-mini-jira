import { Task } from "@/src/types/global";

export type AuthType = "signin" | "signup";

export interface FormValues {
  email: string;
  password: string;
}

export type ColumnID = "todo" | "inprogress" | "done";

export interface ColumnProps {
  id: ColumnID;
  children: React.ReactNode;
}
export interface TaskCardProps {
  id: string;
  task: Task;
}
