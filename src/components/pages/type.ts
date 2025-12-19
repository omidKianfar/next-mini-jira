import { PlanType, Task } from "@/src/types/global";
import dayjs from "dayjs";

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
export interface ChoosePlanSectionProps {
  onBack: () => void;
  onChoosePlan: (plan: PlanType) => void;
}
export interface ActivePaymentSectionProps {
  payment: any;
  onBack: () => void;
  now: dayjs.Dayjs;
}
