import * as Yup from 'yup';
import { UploadMenuForm } from '@/src/types/global';

export const UploadMenuShema = Yup.object({
  fileUrl: Yup.string()
    .transform((value, option) => (option === undefined ? undefined : value))
    .notRequired(),
}) as unknown as Yup.ObjectSchema<UploadMenuForm>;
