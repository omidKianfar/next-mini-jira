import { ProfileProps } from "@/src/types/global";
import * as Yup from "yup";

export const authSchema = Yup.object({
  email: Yup.string().required("Enter your email"),
  password: Yup.string()
    .min(8, "Minimum character is 8")
    .required("Enter your password"),
});

export const ProfileSchema = Yup.object({
  photo: Yup.string()
    .transform((value, option) => (option === undefined ? undefined : value))
    .notRequired(),
  userName: Yup.string().required("Enter your userName"),
  birthday: Yup.string().required("Enter your birthday"),
}) as unknown as Yup.ObjectSchema<ProfileProps>;
