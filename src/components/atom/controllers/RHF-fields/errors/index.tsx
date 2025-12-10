"use client";

import { DateInputFieldProps, ErrorProps, FieldValues } from "../../../imports";

const ErrorComponent = <T extends FieldValues>({
  errors,
  name,
}: Pick<DateInputFieldProps<T>, "name"> & ErrorProps) => {
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
