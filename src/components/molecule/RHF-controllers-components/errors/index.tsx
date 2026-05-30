'use client';

import { FieldValues, Path } from 'react-hook-form';
import { InputFieldsProps } from '@/src/types/global';

interface ErrorProps {
  errors: any;
}

const ErrorComponent = <T extends FieldValues>({
  errors,
  name,
}: Pick<InputFieldsProps<T>, 'name'> & ErrorProps) => {
  return (
    <>
      {errors?.[name] && (
        <p className="text-caption text-error-500">
          {errors[name]?.message as any}
        </p>
      )}
    </>
  );
};

export default ErrorComponent;
