import dayjs from "dayjs";

// type
import { MyUserType, PlanType, Task } from "@/src/types/global";

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
export interface UsersTableProps {
  users: MyUserType[];
  goDetail: (userId: string) => void;
  toggleActive: (user: MyUserType) => Promise<void>;
}
