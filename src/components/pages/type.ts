import { Task } from "./imports";

export type AuthType = "signin" | "signup";


export interface FormValues {
  email: string;
  password: string;
}

export type CartType = {
  title: string;
  description: string;
  onClick: () => void;
  price?: number;
  icon: React.ReactNode;
};

export interface ColumnProps {
  id: string;
  children: React.ReactNode;
}
export interface TaskCardProps {
  id: string;
  task: Task;
}