import { ProfileProps } from "@/src/types/global";
import * as Yup from "yup";

export const authSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email"
    )
    .required("Enter your email"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z\d@#$%^&+=!*/?._-]{8,16}$/,
      "Password must be 8–16 characters and include uppercase, lowercase, number and symbol"
    )
    .required("Enter your password"),
});

export const ProfileSchema = Yup.object({
  photo: Yup.string()
    .transform((value, option) => (option === undefined ? undefined : value))
    .notRequired(),
  userName: Yup.string().required("Enter your userName"),
  birthday: Yup.string().required("Enter your birthday"),
}) as unknown as Yup.ObjectSchema<ProfileProps>;
