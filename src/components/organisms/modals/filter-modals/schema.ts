import { Yup } from '../../imports';
import {
  UsersFilterFormType,
  ChatsFilterFormType,
  TasksFilterFormType,
} from '../../type';

const tasksfilterSchema = Yup.object({
  tag: Yup.string().required('Enter your tag'),
  from: Yup.string()
    .transform((value, option) => (option === undefined ? undefined : value))
    .notRequired(),
  to: Yup.string()
    .transform((value, option) => (option === undefined ? undefined : value))
    .notRequired()
    .test('is-after', 'End time must be after start time', function (value) {
      const { from } = this.parent;

      if (!from) {
        return true;
      } else {
        return from && value ? value > from : false;
      }
    }),
}) as unknown as Yup.ObjectSchema<TasksFilterFormType>;

const usersfilterSchema = Yup.object({
  status: Yup.string().required('Enter your status'),
  from: Yup.string()
    .transform((value, option) => (option === undefined ? undefined : value))
    .notRequired(),
  to: Yup.string()
    .transform((value, option) => (option === undefined ? undefined : value))
    .notRequired()
    .test('is-after', 'End time must be after start time', function (value) {
      const { from } = this.parent;

      if (!from) {
        return true;
      } else {
        return from && value ? value > from : false;
      }
    }),
}) as unknown as Yup.ObjectSchema<UsersFilterFormType>;

const chatsfilterSchema = Yup.object({
  from: Yup.string()
    .transform((value, option) => (option === undefined ? undefined : value))
    .notRequired(),
  to: Yup.string()
    .transform((value, option) => (option === undefined ? undefined : value))
    .notRequired()
    .test('is-after', 'End time must be after start time', function (value) {
      const { from } = this.parent;

      if (!from) {
        return true;
      } else {
        return from && value ? value > from : false;
      }
    }),
}) as unknown as Yup.ObjectSchema<ChatsFilterFormType>;

export { tasksfilterSchema, usersfilterSchema, chatsfilterSchema };
