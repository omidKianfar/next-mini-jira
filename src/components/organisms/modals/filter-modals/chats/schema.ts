import * as Yup from 'yup';
import { ChatsFilterFormType } from './type';

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

export { chatsfilterSchema };
