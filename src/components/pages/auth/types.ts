import { Dispatch, SetStateAction } from "react";

export interface FormValues {
  email: string;
  password: string;
}

export type AuthType = "signin" | "signup";

export interface AuthProps {
  setPage: Dispatch<SetStateAction<AuthType>>;
}
export interface SignupProps extends AuthProps {
  changeStep: (newStep: string) => void;
}
export interface ProfileProps {
  photo?: string;
  userName: string;
  birthday: string;
}
