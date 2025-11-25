export enum UserType {
  Client = "client",
  Admin = "admin",
}

export type MyUser = {
  email: string | null;
  userId: string;
  userType: UserType;
  isActive: boolean;
  photo: string | null;
  userName: string | null;
  birthday: string | null;
};

export type AuthContextActionType = "INITIALIZE" | "IS_LOADING" | "ERROR";

export type AuthLoading =
  | "SIGN_OUT"
  | "INITIALIZING"
  | "SIGN_UP_WITH_EMAIL"
  | "SIGN_IN_WITH_EMAIL"
  | "SIGN_IN_WITH_GOOGLE";

export type AuthContextStateType = {
  error: string;
  user: MyUser | null;
  isLoading: AuthLoading | null;
  isInitialized: boolean;
  isAuthenticated: boolean;
};

export type SignProps = {
  email: string;
  password: string;
};

export type UserProfile = {
  userId: string;
  data: Partial<MyUser>;
};

export type AuthContextProps = Pick<
  AuthContextStateType,
  "user" | "isLoading" | "isAuthenticated"
> & {
  signupWithEmail: ({ email, password }: SignProps) => Promise<MyUser | void>;
  signinWithEmail: ({ email, password }: SignProps) => Promise<MyUser | void>;
  logout: () => Promise<void>;
  saveUserProfile: ({ userId, data }: UserProfile) => Promise<void>;
};
