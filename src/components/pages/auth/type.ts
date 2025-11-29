export type AuthType = "signin" | "signup";

export interface SignupProps {
  changeStep: (newStep: string) => void;
}

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
