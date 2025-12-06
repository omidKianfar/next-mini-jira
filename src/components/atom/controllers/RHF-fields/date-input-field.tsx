"use client";

import {
  Controller,
  DateInputFieldProps,
  ErrorComponent,
  FieldValues,
  LabelComponent,
  useFormContext,
} from "../../imports";

const DateInputField = <T extends FieldValues>({
  name,
  label,
}: DateInputFieldProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      <LabelComponent label={label} name={name} />

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type="date"
            className="w-full my-1 border-2  p-2 rounded-lg border-blue-400 focus:outline-blue-700 px-2 text-sm "
          />
        )}
      />

      <ErrorComponent errors={errors} name={name} />
    </div>
  );
};

export default DateInputField;
