import { AppDispatch } from "@/src/store";
export interface ListenToTasksProps {
  userId: string;
  dispatch: AppDispatch;
}
export interface UpdateTaskStatusProps {
  id: string;
  status: string;
}
export interface FetchTaskProps {
  taskId: string;
}
export interface DeleteTaskProps {
  taskId: string;
}
