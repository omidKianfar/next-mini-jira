import * as Yup from "yup";

// type
import { TasksFilterFormType, UsersFilterFormType } from "../../molecule/type";

// tasks
export const tasksfilterSchema = Yup.object({
  tag: Yup.string().required("Enter your tag"),
  from: Yup.string()
    .transform((value, option) => (option === undefined ? undefined : value))
    .notRequired(),
  to: Yup.string()
    .transform((value, option) => (option === undefined ? undefined : value))
    .notRequired()
    .test("is-after", "End time must be after start time", function (value) {
      const { from } = this.parent;

      if (!from) {
        return true;
      } else {
        return from && value ? value > from : false;
      }
    }),
}) as unknown as Yup.ObjectSchema<TasksFilterFormType>;

// users
export const usersfilterSchema = Yup.object({
  status: Yup.string().required("Enter your status"),
  from: Yup.string()
    .transform((value, option) => (option === undefined ? undefined : value))
    .notRequired(),
  to: Yup.string()
    .transform((value, option) => (option === undefined ? undefined : value))
    .notRequired()
    .test("is-after", "End time must be after start time", function (value) {
      const { from } = this.parent;

      if (!from) {
        return true;
      } else {
        return from && value ? value > from : false;
      }
    }),
}) as unknown as Yup.ObjectSchema<UsersFilterFormType>;
