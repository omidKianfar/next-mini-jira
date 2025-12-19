export enum UserType {
  Client = "client",
  Admin = "admin",
}

export type MyUserType = {
  email: string | null;
  userId: string;
  userType: UserType;
  isActive: boolean;
  photo: string | null;
  userName: string | null;
  birthday: string | null;
  createdAt: string | null;
  payment: {
    isPaid: boolean | null;
    freeTrialEnabled: boolean | null;
    planType: string | null;
    subscriptionId: string | null;
    trialEnd: string | null;
    createdAt: string | null;
    endAt: string | null;
  };
};

export type AuthContextActionType = "INITIALIZE" | "IS_LOADING" | "ERROR";

export type AuthLoading =
  | "SIGN_OUT"
  | "INITIALIZING"
  | "SIGN_UP_WITH_EMAIL"
  | "SIGN_IN_WITH_EMAIL"
  | "SIGN_IN_WITH_GOOGLE";

export type AuthContextStateType = {
  user: MyUserType | null;
  isLoading: AuthLoading | null;
  isInitialized: boolean;
  isAuthenticated: boolean;
};

export type AuthContextProps = AuthContextStateType & {
  signupWithEmail: ({
    email,
    password,
  }: SignPropsType) => Promise<MyUserType | void>;
  signinWithEmail: ({
    email,
    password,
  }: SignPropsType) => Promise<MyUserType | void>;
  googleSignin: () => Promise<void>;
  updatePasswordGoogle: ({
    newPassword,
  }: UserPasswordUpdateType) => Promise<void>;
  addOrUpdatePasswordForCurrentUser: ({
    newPassword,
  }: UserPasswordUpdateType) => Promise<void>;
  logout: () => Promise<void>;
  saveUserProfile: ({ userId, data }: UserProfileType) => Promise<void>;
  terialMode: ({ userId }: UserProfileType) => Promise<void>;
  changeStep: (newStep: string) => void;
  stepNumber: string;
};

export type SignPropsType = {
  email: string;
  password: string;
};

export type UserProfileType = {
  userId: string;
  data?: Partial<MyUserType>;
};

export type UserPasswordUpdateType = {
  newPassword: string;
};

export type AuthStateType = {
  user: MyUserType | null;
  isLoading: string | null;
  isAuthenticated: boolean;
};
export interface ProfileProps {
  photo?: string;
  userName: string;
  birthday: string;
}

export type PlanType = "monthly" | "yearly";

export type TaskStatus = "todo" | "inprogress" | "done";

export type TagType = "task" | "bug";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  tag: TagType;
  createdAt: string;
  attachment?: {
    fileUrl?: string | null;
    fileType?: string | null;
  };
  userId: string;
  updatedAt?: string;
};

export type TaskForm = {
  title: string;
  description: string;
  tag: TagType;
  attachment?: {
    fileUrl?: string | null;
    fileType?: string | null;
  };
};

export type TaskState = {
  tasks: Task[];
};

export type Columns = {
  label: string;
  value: string;
};

export type FiltersState = {
  tag: string | null;
  date: {
    from: string | null;
    to: string | null;
  };
};
