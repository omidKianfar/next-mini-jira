import { dayjs, PlanType, Task } from './imports';

type AuthType = 'signin' | 'signup';
interface FormValues {
  email: string;
  password: string;
}

type ColumnID = 'todo' | 'inprogress' | 'done';
interface ColumnProps {
  id: ColumnID;
  children: React.ReactNode;
}
interface TaskCardProps {
  id: string;
  task: Task;
}
interface ChoosePlanSectionProps {
  onBack: () => void;
  onChoosePlan: (plan: PlanType) => void;
}
interface ActivePaymentSectionProps {
  payment: any;
  onBack: () => void;
  now: dayjs.Dayjs;
}

export type {
  AuthType,
  FormValues,
  ColumnID,
  ColumnProps,
  TaskCardProps,
  ChoosePlanSectionProps,
  ActivePaymentSectionProps,
};
