import * as Yup from 'yup';

// type
import { UploadMenuForm } from '../../type';

export const UploadMenuShema = Yup.object({
  fileUrl: Yup.string()
    .transform((value, option) => (option === undefined ? undefined : value))
    .notRequired(),
}) as unknown as Yup.ObjectSchema<UploadMenuForm>;
