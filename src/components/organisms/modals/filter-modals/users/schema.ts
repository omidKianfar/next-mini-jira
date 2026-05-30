import * as Yup from 'yup';
import { UsersFilterFormType } from './type';

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

export { usersfilterSchema };
