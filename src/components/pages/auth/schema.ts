import * as Yup from "yup";

export const authSchema = Yup.object({
  email: Yup.string().required("Enter your email"),
  password: Yup.string()
    .min(8, "Minimum character is 8")
    .required("Enter your password"),
});
