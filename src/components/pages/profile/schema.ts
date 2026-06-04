import * as Yup from 'yup';
import { ProfileProps } from '@/src/types/global';

export const ProfileSchema = Yup.object({
  photo: Yup.string()
    .transform((value, option) => (option === undefined ? undefined : value))
    .notRequired(),
  userName: Yup.string().required('Enter your userName'),
  birthday: Yup.string()
    .required('Enter your birthday')
    .test(
      'is-past-date',
      'Birthday cannot be today or in the future',
      (value) => {
        if (!value) return false;
        const selectedDate = new Date(value);
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        return selectedDate < today;
      }
    ),
}) as unknown as Yup.ObjectSchema<ProfileProps>;
