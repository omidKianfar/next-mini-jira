'use client';

import { FieldValues } from 'react-hook-form';
import { InputFieldsProps } from '@/src/types/global';

const LabelComponent = <T extends FieldValues>({
  label,
  name,
}: Pick<InputFieldsProps<T>, 'name' | 'label'>) => {
  return (
    <>
      {label && (
        <label htmlFor={name} className="text-label text-primary-400">
          {label}
        </label>
      )}
    </>
  );
};

export default LabelComponent;
