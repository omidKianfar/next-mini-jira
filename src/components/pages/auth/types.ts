import { Dispatch, SetStateAction } from "react";

export interface FormValues {
  email: string;
  password: string;
}

export type AuthType = "signin" | "signup";

export interface AuthProps {
  setPage: Dispatch<SetStateAction<AuthType>>;
}
