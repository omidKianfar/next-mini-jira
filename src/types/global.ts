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
};

export type SignPropsType = {
  email: string;
  password: string;
};

export type UserProfileType = {
  userId: string;
  data: Partial<MyUserType>;
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

export type Column = {
  label: string;
  value: string;
};

export type Task = {
  id: number;
  title: string;
  description?: string;
  status: string;
  assignedTo?: number;
};
