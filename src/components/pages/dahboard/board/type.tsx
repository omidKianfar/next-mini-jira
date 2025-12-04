import { Task } from "../imports";

export interface ColumnProps {
  id: string;
  children: React.ReactNode;
}
export interface TaskCardProps {
  id: string;
  task: Task;
}
