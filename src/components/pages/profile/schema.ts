import * as Yup from "yup";
import { ProfileProps } from "../imports";

export const ProfileSchema = Yup.object({
  photo: Yup.string()
    .transform((value, option) => (option === undefined ? undefined : value))
    .notRequired(),
  userName: Yup.string().required("Enter your userName"),
  birthday: Yup.string().required("Enter your birthday"),
}) as unknown as Yup.ObjectSchema<ProfileProps>;
